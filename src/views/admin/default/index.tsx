import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import Box from "components/box/Box";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataComplex from "./variables/tableDataComplex";
import Transaction from "components/transaction/Transaction";

const Dashboard = () => {
  const dummyData = {
    totalTransaction: {
      receive: "￥3338.26",
      send: "￥10100",
      amountSendTrans: 0,
      amountReceiveTrans: 0,
      tooltip: "交易总金额",
    },
    todayTransaction: {
      receive: "￥0",
      send: "￥0",
      amountSendTrans: 0,
      amountReceiveTrans: 0,
      tooltip: "今日成功交易金额及笔数"
    },
    yesterdayTransaction: {
      receive: "￥0",
      send: "￥0",
      amountSendTrans: 0,
      amountReceiveTrans: 0,
      tooltip: "今日成功交易金额及笔数"
    },
  }
  return (
    <div>
      {/* Card widget */}

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3">
        <Transaction
          title="交易总金额"
          info={dummyData.todayTransaction}
          yesterday={dummyData.yesterdayTransaction}/>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-2">
          <div className="row-2">
            <Box
              title="交易总金额"
              info={
                dummyData.totalTransaction
              }
            />
            <Box
              title="交易总金额"
              info={
                dummyData.totalTransaction
              }
            />
          </div>
          <div className="row-2">
            <Box
              title="交易总金额"
              info={
                dummyData.totalTransaction
              }
            />
            <Box
              title="交易总金额"
              info={
                dummyData.totalTransaction
              }
            />
          </div>
        </div>
        
        <Transaction
          title="交易总金额"
          info={dummyData.todayTransaction}
          yesterday={dummyData.yesterdayTransaction}/>

      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable tableData={tableDataComplex} />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
