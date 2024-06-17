import React, { useEffect } from 'react';
import DataExportComponent from './DataExportComponent';
import PinReport from './PinReport';
import { getAdminReports } from '../../actions/reports';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

const CombinedComponent = () => {
const dispatch = useDispatch()
  const adminId = useSelector((state)=> state.auth?.authData?.admin?.username)
  const adminReports = useSelector((state)=> state.reports.adminReports)
  useEffect(() => {
    dispatch(getAdminReports(adminId))
  }, [])
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  return (
    
    <div className="flex space-x-4 p-4">
      <div className="w-full">
        {isEmpty(adminReports) ? <Loader /> : <DataExportComponent adminReports={adminReports} />}
      </div>
    </div>
  );
};

export default CombinedComponent;
