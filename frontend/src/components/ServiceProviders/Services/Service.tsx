import DateSquare from "../../General/DateSquare/DateSquare";

const Service = (props: {
  desc: string;
  price: string;
  loc: string;
}) => {
  return (
    <div className="flex flex-row items-center p-1.5 justify-between">
      <div className="flex flex-col">
        <div className="text-lg p-2">{props.desc}</div>
        <div className="text-lg p-2">$ {props.price}</div>
        <div className="text-lg p-2">{props.loc}</div>
      </div>
      
    </div>
  );
};

export default Service;
