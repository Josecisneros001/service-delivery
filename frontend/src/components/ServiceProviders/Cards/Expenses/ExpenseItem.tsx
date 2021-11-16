import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "../../../../tailwindcss.css";

const ExpenseItem = (props: {
  client: string;
  title: string;
  date: Date;
  desc: string;
}) => {
  return (
    <Card className=" p-2 m-4 bg-red-200">
      <div className="w-2/2">
        <div className="flex flex-col">
          <div className="text-2xl">{props.title}</div>
          <div className="flex bg-white items-center rounded-2xl p-2 flex-row justify-between">
            <div className="flex flex-row items-center">
              <ExpenseDate date={props.date} />
              <div className="text-lg p-5">{props.desc}</div>
            </div>
            <div className="text-lg font-extrabold">{props.client}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
