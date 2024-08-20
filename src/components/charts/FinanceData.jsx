import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { financeData } from "../../actions/financeData";
import { financeDataAdmin } from "../../actions/financeDataAdmin";
import Loader from "../report/Loader";

const FinanceData = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);

  let username = "";
  if (userRole === "admin") {
    username = useSelector((state) => state.auth.authData.admin?.username);
  } else if (userRole === "customer") {
    username = useSelector((state) => state.auth.authData.customer?.username);
  }
  // const [totalSum, setTotalSum] = useState(0);
  // const [pendingSum, setPendingSum] = useState(0);
  const [totalChunksArray, setTotalChunksArray] = useState([]);
  const [pendingChunksArray, setPendingChunksArray] = useState([]);
  const fData = useSelector((state) => state.FinanceData);
  const adminFData = useSelector((state)=> state.FinanceDataAdmin);
  const totalSum = useSelector((state)=> state.FinanceData.total_commission)
  const pendingSum = useSelector((state)=> state.FinanceData.pending_commission)

  const adminCommissionEarned = useSelector((state) => state.FinanceDataAdmin?.commission_earned);
  const adminPendingCommission = useSelector((state) => state.FinanceDataAdmin?.pending_amount_to_pay);
  const adminAmountPaid = useSelector((state) => state.FinanceDataAdmin?.paid_amount);
  const adminPendingAmount = useSelector((state) => state.FinanceDataAdmin?.pending_amount_to_pay);
  const adminProductPurchase = useSelector((state) => state.FinanceDataAdmin?.product_purchase_tds);

  // useEffect(() => {
  //   if (fData && fData.total_commission) {
  //     const { total_commission, pending_commission } = fData;

  //     const processNumber = (num) => {
  //       const numString = num.toString();
  //       let chunks = [];
  //       for (let i = 0; i < numString.length; i += 3) {
  //         let chunk = numString.slice(i, i + 3);
  //         chunks.push(parseInt(chunk, 10));
  //       }
  //       return chunks;
  //     };
  //     if (total_commission !== undefined && total_commission !== null) {
  //       const totalChunks = processNumber(total_commission);
  //       setTotalChunksArray(totalChunks);
  //       const totalSum = totalChunks.reduce((acc, chunk) => acc + chunk, 0);
  //       setTotalSum(totalSum);
  //     }

  //     if (pending_commission !== undefined && pending_commission !== null) {
  //       const pendingChunks = processNumber(pending_commission);
  //       setPendingChunksArray(pendingChunks);
  //       const pendingSum = pendingChunks.reduce((acc, chunk) => acc + chunk, 0);
  //       setPendingSum(pendingSum);
  //     }
  //   }
  // }, [fData]);

  

  useEffect(() => {
    if (userRole === "admin") {
      dispatch(financeDataAdmin(username));
    } else if (userRole === "customer") {
      dispatch(financeData(username));
    }
  }, [dispatch, userRole, username]);

  return (
    <div className="flex flex-wrap p-4">
      {userRole === "customer" ? (
        <>
          <div className="w-mid  p-2">
            <CardComponent
              title="Commission Earned"
              amount={totalSum ? totalSum : <Loader />}
              tooltip="Total amount earned from commissions, including all service charges and tax."
            />
          </div>
          <div className="w-mid  p-2">
            <CardComponent
              title="Pending Commission"
              amount={pendingSum ? pendingSum : <Loader />}
              tooltip="Commission amount that is pending for this month."
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-2">
            <CardComponent
              title="Commission Earned"
              amount={adminCommissionEarned}
              tooltip="Total amount earned from commissions, including all service charges and tax."
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-2">
            <CardComponent
              title="Pending Commission"
              amount={adminPendingCommission}
              tooltip="Commission amount that is pending for this month."
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-2">
            <CardComponent
              title="Amount Paid"
              amount={adminAmountPaid}
              tooltip="Total amount paid out for all services and products."
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-2">
            <CardComponent
              title="Pending Amount"
              amount={adminPendingAmount}
              tooltip="Total amount that is pending for payment."
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-2">
            <CardComponent
              title="Product Purchase TDS"
              amount={adminProductPurchase}
              tooltip="Tax Deducted at Source (TDS) for product purchases."
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FinanceData;
