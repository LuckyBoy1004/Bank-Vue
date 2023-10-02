import Card from "components/card";
import TooltipHorizon from "components/tooltip";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface Info {
  receive: string,
  send: string,
  tooltip: string,
}

const Box = (props: {
  title: string;
  info: Info;
}) => {
  const { title, info } = props;
  return (
    <Card extra="!flex-row flex-grow items-top rounded-[20px] p-3">
      <div className="h-auto ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600 my-2">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          收 {info.receive}<br/>
          付 {info.send}
        </h4>
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

export default Box;
