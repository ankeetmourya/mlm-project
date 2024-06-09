// src/components/TreeNode.js
import React from 'react';

const TreeNode = ({ node }) => {
  return (
    <li className="list-none text-center relative">
      <div className="flex flex-col items-center">
        <img className="w-12 h-12 rounded-full" src="https://placehold.co/48x48" alt="user" />
        <span className="mt-2 text-sm bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
          {node.name}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="flex justify-center mt-4 space-x-8">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
            
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
