// src/components/Tree.js
import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({ data }) => {
  return (
    <ul className="flex justify-center">
      <TreeNode node={data} />
    </ul>
  );
};

export default Tree;
