import React from 'react';
import DataExportComponent from './DataExportComponent';
import PinReport from './PinReport';

const CombinedComponent = () => {
  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/2">
        <DataExportComponent />
      </div>
      <div className="w-1/2">
        <PinReport />
      </div>
    </div>
  );
};

export default CombinedComponent;
