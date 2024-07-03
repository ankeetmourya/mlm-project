import React from 'react'
import MyBarChart from './charts/MyBarChart'
import PayoutChart from './charts/PayoutChart'
import TopPerformer from './charts/TopPerformerChart'
import MemberChart from './charts/MemberChart'
import IncomeCard from './charts/IncomeCard'


const Dashboard = () => {
  return (
    <>
    <div className="flex flex-wrap justify-between gap-4 p-4">
  {/* <IncomeCard /> */}
</div>
    <div className="flex flex-wrap justify-center gap-8 p-6">
      <TopPerformer />
      <MemberChart />
    </div>
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <PayoutChart />
      
    </div>
    </>
  )
}

export default Dashboard
