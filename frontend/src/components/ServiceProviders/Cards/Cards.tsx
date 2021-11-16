import Expenses from "./Expenses/Expenses";
import { useState } from "react";

const dummy_expenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "e1",
    title: "Toilet Paper",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "e1",
    title: "Toilet Paper",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "e1",
    title: "Toilet Paper",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  {
    id: "e1",
    title: "Toilet Paper",
    client: "A.J Cook",
    date: new Date(2020, 7, 14),
    desc: "9:00 am Privada BocaNegra 602"
  },
  
];

const Cards = () => {
  const [expenses, _setExpenses] = useState(dummy_expenses);

  return (
    <div className="w-3/5 m-auto">
      <Expenses item={expenses} />
    </div>
  );
};

export default Cards;
