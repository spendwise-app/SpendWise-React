import AddExpense from "../../component/AddExpense/AddExpense";
import ExpenseList from "../../component/ExpenseList/ExpenseList";
import Header from "../../component/Header/Header";

import "./dashBoard.css";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="setion_1">
        <AddExpense />
      </div>
      <div className="section_2">
        <ExpenseList />
      </div>
    </div>
  );
};

export default DashBoard;
