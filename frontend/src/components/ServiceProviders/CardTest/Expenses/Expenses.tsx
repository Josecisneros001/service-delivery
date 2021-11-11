import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props: {
  item: Array<{
    id: string
    title: string,
    amount: number,
    date: Date,
  }>,
}) => {
  return (
    <div>
      <Card className="Expenses">
        <>
          {props.item.map((expense) => (
            <ExpenseItem
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))}
        </>
      </Card>
    </div>
  );
};

export default Expenses;
