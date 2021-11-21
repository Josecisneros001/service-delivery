import DateSquare from "../../General/DateSquare/DateSquare";

const Reservation = (props: {
  client: string;
  date: Date;
  desc: string;
}) => {
  return (
    <div className="flex flex-row items-center p-1.5 justify-between">
      <div className="flex flex-row items-center">
        <DateSquare date={props.date} />
        <div className="text-lg p-5">{props.desc}</div>
      </div>
      <div className="text-lg">{props.client}</div>
    </div>
  );
};

export default Reservation;
