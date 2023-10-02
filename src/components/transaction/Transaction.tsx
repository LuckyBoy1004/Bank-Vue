import Card from "components/card";
import LineChart from "components/charts/LineChart";
import TooltipHorizon from "components/tooltip";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { lineChartOptionsTotalSpent, lineChartDataTotalSpent } from "variables/charts";

interface Info {
  receive: string,
  send: string,
  amountReceiveTrans: number,
  amountSendTrans: number,
  tooltip: string,
}

const Transaction = (props: {
  title: string;
  info: Info;
  yesterday: Info;
}) => {
  const { title, info } = props;
  return (
    <Card extra="!flex-row flex-grow items-top rounded-[20px] p-3">
      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600 my-2">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white inline-flex items-center">
          收: {info.receive}
          <p className="font-dm text-sm font-small text-gray-600 ml-2">共{info.amountReceiveTrans}笔</p>
        </h4>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white inline-flex items-center">
           付: {info.send}
          <p className="font-dm text-sm font-small text-gray-600 ml-2">共{info.amountSendTrans}笔</p>
        </h4>
        <div className="h-full w-full">
          <LineChart
            chartOptions={lineChartOptionsTotalSpent}
            chartData={lineChartDataTotalSpent}
          />
        </div>
      </div>
      <div className="mt-2 ml-auto">
        <TooltipHorizon
          extra={""}
          trigger={
            <div>
              <BsFillInfoCircleFill />
            </div>
          }
          content={<div>{info.tooltip}</div>}
          placement={"top"}
        />
      </div>
    </Card>
  );
};

export default Transaction;
