import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props: {
  item: Array<{
    id: string
    title: string,
    client: string,
    date: Date,
    desc: string,
  }>,
}) => {
  return (
    <div>
      <Card className="Expenses p-0.5">
        <>
          {props.item.map((expense) => (
            <ExpenseItem
              title={expense.title}
              client={expense.client}
              date={expense.date}
              desc={expense.desc}
            />
          ))}
        </>
      </Card>
    </div>
  );
};

export default Expenses;
