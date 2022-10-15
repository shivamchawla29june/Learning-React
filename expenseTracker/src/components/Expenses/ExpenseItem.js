import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

import { useState } from "react";

function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title);

  // const clickHandler = () => {
  //   setTitle('ABC');
  // };
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />

        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price"> {props.amount}</div>
        </div>
        {/* <button onClick={clickHandler}></button> */}
      </Card>
    </li>
  );
}

export default ExpenseItem;
