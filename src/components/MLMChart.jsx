import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import { FaUser, FaPlus, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const MLMChart = () => {
  const [data, setData] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const treeContainerRef = useRef();

  const exampleData = {
    name: 'unileveladdon',
    children: [
      {
        name: 'INF00123',
        children: [
          {
            name: 'INF28013199',
            children: [
              { name: 'INF26378140' },
              { name: 'INF25822170' },
            ],
          },
          { name: 'INF13114042' },
          { name: 'Developer' },
        ],
      },
      {
        name: 'INF91213308',
        children: [
          { name: 'INF78557798' },
          { name: 'INF7398197' },
          { name: 'INF69756130' },
        ],
      },
      {
        name: 'INF23318800',
        children: [
          { name: 'user001' },
          { name: 'user002' },
          { name: 'user003' },
        ],
      },
      { name: 'INF86459688' },
    ],
  };

  useEffect(() => {
    setData(exampleData);
  }, []);

  const handleAddPerson = (node) => {
    const newName = prompt("Enter the new person's name:");
    if (newName) {
      const newNode = { name: newName };
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

  const handleNodeClick = (nodeDatum, evt) => {
    setClickedNode(nodeDatum);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const renderNodeWithCustomIcon = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r={15}
        onClick={() => handleNodeClick(nodeDatum)}
        className={`cursor-pointer ${clickedNode && clickedNode.name === nodeDatum.name ? 'stroke-blue-500' : ''}`}
      />
      <FaUser
        x="-10"
        y="-10"
        fontSize="20px"
        color="#4A90E2"
        onMouseEnter={(evt) => handleMouseEnter(nodeDatum, evt)}
        onMouseLeave={handleMouseLeave}
      />
      <text fill="black" x="20" dy="0.35em" className="cursor-pointer" onClick={() => handleAddPerson(nodeDatum)}>
        {nodeDatum.name}
      </text>
      {nodeDatum.depth > 0 && (
        <FaPlus
          x="50"
          y="-10"
          fontSize="20px"
          color="green"
          className="cursor-pointer"
          onClick={() => handleAddPerson(nodeDatum)}
        />
      )}
    </g>
  );

  if (!data) return <div>Loading...</div>;

  const containerStyles = {
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={containerStyles} ref={treeContainerRef} className="bg-gray-100 relative">
      <div className="absolute top-4 right-4 z-10 flex flex-col">
        <button onClick={handleZoomIn} className="bg-blue-500 text-white p-2 rounded mb-2">
          <FaSearchPlus />
        </button>
        <button onClick={handleZoomOut} className="bg-blue-500 text-white p-2 rounded">
          <FaSearchMinus />
        </button>
      </div>
      <Tree
        data={data}
        translate={{ x: 400, y: 100 }}
        orientation="vertical"
        pathFunc="step"
        scale={scale}
        renderCustomNodeElement={renderNodeWithCustomIcon}
        styles={{
          links: { stroke: '#D3D3D3' },
          nodes: {
            node: { circle: { stroke: '#ff0000', strokeWidth: 3 } },
            leafNode: { circle: { stroke: '#00ff00', strokeWidth: 3 } },
          },
        }}
      />
      {hoveredNode && (
        <div
          className="absolute bg-white border border-gray-300 p-2 rounded shadow-md"
          style={{ top: hoveredNode.y + 15, left: hoveredNode.x + 15 }}
        >
          <p><strong>Name:</strong> {hoveredNode.name}</p>
          {/* Add more details here */}
        </div>
      )}
    </div>
  );
};

export default MLMChart;
