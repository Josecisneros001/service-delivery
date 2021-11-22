import DateSquare from "../../General/DateSquare/DateSquare";

const Service = (props: {
  desc: string;
  price: string;
  loc: string;
}) => {
  return (
    <div className="flex flex-row items-center p-1.5 justify-between">
      <div className="flex flex-row items-center">
        <div className="text-lg p-5">{props.desc}</div>
      </div>
      <div className="text-lg">{props.loc}</div>
    </div>
  );
};

export default Service;
