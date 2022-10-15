import { useState } from "react";

import Card from "../UI/Card";
import ExpensesList from './ExpensesList'

import "./Expenses.css";
import ExpensesFilter from "./ExpenseFilter";
import ExpensesChart from "./ExpensesChart";
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2020')
  
  const filterChangeHandler = selectedYear =>{
    setFilteredYear(selectedYear)
    // console.log(selectedYear)

  }

  const filterExpenses = props.items.filter((expense) =>{
    return expense.date.getFullYear().toString() === filteredYear
  })

  return (
    <div>
      <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onFilterChange={filterChangeHandler}/>
      <ExpensesChart expenses={filterExpenses}/>
      <ExpensesList items={filterExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;
