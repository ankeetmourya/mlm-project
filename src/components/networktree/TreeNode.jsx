import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import { FaPlus, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import MixedNodeInputElement from './MixedNodeInputElement';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';
import { useSelector } from 'react-redux';

const TreeNode = ({ network }) => {
  const [data, setData] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const treeContainerRef = useRef();
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    const transformedData = transformNetworkData(network);
    setData(transformedData);
  }, [network]);

  let windowWidth = window.innerWidth;
  let smallScreen = windowWidth <= 768;

  const transformNetworkData = (data) => {
    const transformNode = (node) => {
      const { username, id, first_name, sponserer_username } = node.data;
      return {
        name: username,
        attributes: { ID: id, FirstName: first_name, Sponserer: sponserer_username },
        children: node.children ? node.children.map(transformNode) : [],
      };
    };
    return transformNode(data);
  };

  const countNodes = (node) => {
    if (!node.children || node.children.length === 0) {
      return 0;
    }
  
    let count = node.children.length;
  
    node.children.forEach(child => {
      count += countNodes(child);
    });
  
    return count;
  };


  const customNodeFnMapping = {
    svg: {
      description: 'Default - Pure SVG node & label (IE11 compatible)',
      fn: (rd3tProps, appState) => (
        <PureSvgNodeElement
          nodeDatum={rd3tProps.nodeDatum}
          toggleNode={rd3tProps.toggleNode}
          orientation={appState.orientation}
        />
      ),
    },
    mixed: {
      description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
      fn: ({ nodeDatum, toggleNode }, appState) => (
        <MixedNodeElement
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          foreignObjectProps={{
            width: appState.nodeSize.x,
            height: appState.nodeSize.y,
            x: -50,
            y: 50,
          }}
        />
      ),
    },
    input: {
      description: 'MixedNodeElement - Interactive nodes with inputs',
      fn: ({ nodeDatum, toggleNode }, appState) => (
        <MixedNodeInputElement
          nodeData={nodeDatum}
          triggerNodeToggle={toggleNode}
          foreignObjectProps={{
            width: appState.nodeSize.x,
            height: appState.nodeSize.y,
            x: -50,
            y: 50,
          }}
        />
      ),
    },
  };


  let treeProps = {
    data: data,
   totalNodeCount: data && Object.keys(data).length>0 && countNodes(data),
    orientation: 'vertical',
    dimensions: undefined,
    // pathFunc:"step",
    centeringTransitionDuration: 800,
    translateX: smallScreen ? 187 : 548,
    translateY: smallScreen ? 140 : 115,
    collapsible: true,
    shouldCollapseNeighborNodes: false,
    initialDepth: userRole == 'admin' ? 100 : 6,
    depthFactor: undefined,
    zoomable: true,
    draggable: true,
    zoom: 1,
    scaleExtent: { min: 0.1, max: 1 },
    separation: { siblings: 2, nonSiblings: 2 },
    nodeSize: { x: 200, y: 200 },
    enableLegacyTransitions: false,
    transitionDuration: 500,
    renderCustomNodeElement: customNodeFnMapping['svg'].fn,
    styles: {
      nodes: {
        node: {
          circle: {
            fill: '#52e2c5',
          },
          attributes: {
            stroke: '#000',
          },
        },
        leafNode: {
          circle: {
            fill: 'transparent',
          },
          attributes: {
            stroke: '#000',
          },
        },
      },
    },
  };



  const handleAddPerson = (node) => {
    const newName = prompt("Enter the new person's name:");
    if (newName) {
      const newNode = { name: newName, attributes: {}, id: newName };
      if (!node.children) {
        node.children = [];
      }
      node.children.push(newNode);
      setData({ ...data });
    }
  };

  const handleMouseEnter = (node, evt) => {
    const { clientX, clientY } = evt;
    setHoveredNode({ ...node, x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  const handleNodeClick = (nodeDatum) => {
    setClickedNode(nodeDatum);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const renderNodeWithCustomIcon = ({ nodeDatum }) => (
    <g>
      <circle
        r={20}
        onClick={() => handleNodeClick(nodeDatum)}
        className={`cursor-pointer nodeImg ${
          clickedNode && clickedNode.name === nodeDatum.name ? 'stroke-blue-500' : 'stroke-black'
        }`}
        fill="#fff"
      />
      <text fill="black" x="25" dy="0.35em" className="cursor-pointer" onClick={() => handleAddPerson(nodeDatum)}>
        {nodeDatum.name}
      </text>
      <FaPlus
        x="50"
        y="-10"
        fontSize="20px"
        color="green"
        className="cursor-pointer"
        onClick={() => handleAddPerson(nodeDatum)}
      />
    </g>
  );

  if (!data) return <div>Loading...</div>;



  const containerStyles = {
    width: '100%',
    height: '100vh',
    // backgroundColor: '#f0f0f0',   
  };

  return ( 
    Object.keys(network).length>0 && 
    <div className={`relative ${smallScreen ? "mobileTree" : "desktopTree"} `} style={containerStyles} ref={treeContainerRef}>
         <div className="p-4 ">
              Total Members: {treeProps.totalNodeCount}
            </div>
           <Tree
                hasInteractiveNodes
                data={treeProps.data}
                renderCustomNodeElement={
                  treeProps.renderCustomNodeElement
                    ? rd3tProps => treeProps.renderCustomNodeElement(rd3tProps, treeProps)
                    : undefined
                }
                rootNodeClassName="demo-node"
                branchNodeClassName="demo-node"
                orientation={treeProps.orientation}
                dimensions={treeProps.dimensions}
                centeringTransitionDuration={treeProps.centeringTransitionDuration}
                translate={{ x: treeProps.translateX, y: treeProps.translateY }}
                pathFunc={treeProps.pathFunc}
                collapsible={treeProps.collapsible}
                initialDepth={treeProps.initialDepth}
                zoomable={treeProps.zoomable}
                draggable={treeProps.draggable}
                zoom={treeProps.zoom}
                scaleExtent={treeProps.scaleExtent}
                nodeSize={treeProps.nodeSize}
                separation={treeProps.separation}
                enableLegacyTransitions={treeProps.enableLegacyTransitions}
                transitionDuration={treeProps.transitionDuration}
                depthFactor={treeProps.depthFactor}
                styles={treeProps.styles}
                shouldCollapseNeighborNodes={treeProps.shouldCollapseNeighborNodes}
                onNodeClick={(node, evt) => {
                  console.log('onNodeClick', node, evt);
                }}
                onNodeMouseOver={(...args) => {
                  console.log('onNodeMouseOver', args);
                }}
                onNodeMouseOut={(...args) => {
                  console.log('onNodeMouseOut', args);
                }}
                onLinkClick={(...args) => {
                  console.log('onLinkClick');
                  console.log(args);
                }}
                onLinkMouseOver={(...args) => {
                  console.log('onLinkMouseOver', args);
                }}
                onLinkMouseOut={(...args) => {
                  console.log('onLinkMouseOut', args);
                }}
              />
      {hoveredNode && (
        <div
          className="absolute bg-white border border-gray-300 p-4 rounded shadow-lg"
          style={{ top: hoveredNode.y + 15, left: hoveredNode.x + 15 }}
        >
          <p className="text-gray-800 font-semibold">{hoveredNode.name}</p>
          <p>ID: {hoveredNode.attributes.ID}</p>
          <p>First Name: {hoveredNode.attributes.FirstName}</p>
          <p>Sponserer: {hoveredNode.attributes.Sponserer}</p>
        </div>
      )}
    </div>
    
  );
};

export default TreeNode;
