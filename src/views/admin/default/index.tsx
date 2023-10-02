import TotalSpent from "views/admin/default/components/TotalSpent";

import Box from "components/box/Box";
import CheckTable from "views/admin/default/components/CheckTable";
import tableDataCheck from "./variables/tableDataCheck";
import Transaction from "components/transaction/Transaction";
import Banner from "./components/Banner";

const Dashboard = () => {
  const dummyData = {
    totalTransactionAmount: {
      receive: "￥3338.26",
      send: "￥10100",
      tooltip: "交易总金额",
    },
    todayTransaction: {
      receive: "￥0",
      send: "￥0",
      tooltip: "今日成功交易金额及笔数"
    },
    yesterdayTransaction: {
      receive: "￥0",
      send: "￥0",
      tooltip: "今日成功交易金额及笔数"
    },
    sevendaysTransaction: {
      receive: "￥0",
      send: "￥0",
      tooltip: "今日成功交易金额及笔数"
    },
    numberTransactions: {
      receive: "117",
      send: "101",
      tooltip: "交易总笔数"
    },
    totalFee: {
      receive: "￥371.2",
      send: "￥1320",
      tooltip: "交易手续费总"
    },
    todayFee: {
      receive: "￥0",
      send: "￥0",
      tooltip: "交易手续费总"
    },
  }
  return (
    <div>
      {/* Card widget */}

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3">
        <Transaction
          title="交易总金额"
          info={dummyData.todayTransaction}
          yesterday={dummyData.yesterdayTransaction}
          sevenDays={dummyData.sevendaysTransaction}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-2">
          <div className="grid grid-rows-2 space-y-4">
            <Box
              title="交易总金额"
              info={
                dummyData.totalTransactionAmount
              }
            />
            <Box
              title="交易总笔数"
              info={
                dummyData.numberTransactions
              }
            />
          </div>
          <div className="grid grid-row-2 space-y-4">
            <Box
              title="总手续费"
              info={
                dummyData.totalFee
              }
            />
            <Box
              title="今日手续费"
              info={
                dummyData.todayFee
              }
            />
          </div>
        </div>

        <Banner />

      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <CheckTable tableData={tableDataCheck} />
      </div>
    </div>
  );
};

export default Dashboard;
