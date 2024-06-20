import React, { useEffect } from 'react';
import DataExportComponent from './DataExportComponent';
import PinReport from './PinReport';
import { getAdminReports } from '../../actions/reports';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { newMembers } from '../../actions/newMembers';
import NewJoinedMember from './newJoinedMember';
import { highPerforming } from '../../actions/highPerformingCustomer';
import HighPerformingTeam from './HighPerformingTeam';


const CombinedComponent = () => {
const dispatch = useDispatch()
  const adminId = useSelector((state)=> state.auth?.authData?.admin?.username)
  const adminReports = useSelector((state)=> state.reports.adminReports)
  const newMembersReports = useSelector((state) => state.newMembers);
  const userRole = useSelector((state) => state.auth.userRole);
    
  const userName = userRole == 'admin' ?  useSelector(
    (state) => state?.auth?.authData?.admin?.username ) : useSelector(
      (state) => state?.auth?.authData?.customer?.username
  );

  const highPerformanceReports = useSelector((state) => state.highPerformingCustomer);
  useEffect(() => {
    dispatch(highPerforming(userName));
  }, [dispatch]);


      useEffect(() => {
        dispatch(newMembers());
      }, [dispatch]);


  useEffect(() => {
    dispatch(getAdminReports(adminId))
  }, [])
  const isEmpty = (obj) => Object.keys(obj).length === 0;
  const isLoading = isEmpty(adminReports) || isEmpty(newMembersReports) || isEmpty(highPerformanceReports);

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataExportComponent adminReports={adminReports} />
          <NewJoinedMember newMembers={newMembersReports} />
          <HighPerformingTeam highPerforming={highPerformanceReports} />
        </>
      )}
    </div>
    </div>
  );
};

export default CombinedComponent;
