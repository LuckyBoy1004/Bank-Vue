import Card from "components/card";
import LineChart from "components/charts/LineChart";
import TooltipHorizon from "components/tooltip";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { lineChartOptionsTotalSpent, lineChartDataTotalSpent } from "variables/charts";

interface Info {
  receive: string,
  send: string,
  tooltip: string,
}

const Transaction = (props: {
  title: string;
  info: Info;
  yesterday: Info;
  sevenDays: Info;
}) => {
  const { title, info, sevenDays, yesterday } = props;
  return (
    <Card extra="!flex-row flex-grow items-top rounded-[20px] p-3">
      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600 my-2">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white inline-flex items-center">
          收: {info.receive}
          <p className="font-dm text-sm font-small text-gray-600 ml-2">共{sevenDays.receive}笔</p>
        </h4>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white inline-flex items-center">
           付: {info.send}
          <p className="font-dm text-sm font-small text-gray-600 ml-2">共{sevenDays.send}笔</p>
        </h4>
        <div className="h-full w-full">
          <LineChart
            chartOptions={lineChartOptionsTotalSpent}
            chartData={lineChartDataTotalSpent}
          />
        </div>
        <div className="inline-flex grid grid-cols-2 w-full">
          <p className="font-dm text-sm font-small text-gray-600">昨日:(收){yesterday.receive}/(付)￥{yesterday.send}</p>
          <p className="font-dm text-sm font-small text-gray-600 ml-4">七日:(收){sevenDays.receive}/(付){sevenDays.receive}</p>
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
