import { useState } from "react";
import "./addExpense.css";
import { toast } from "react-toastify";
import useExpense from "../../store/useExpense";
import categories from "../../utilities/categories";
import useStore from "../../store/zustand";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addExpense } = useExpense();
  const { user } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      return toast.error("All fields are required");
    }

    setIsLoading(true);
    try {
      await addExpense({ title, amount, category, date: Date.now() });
      toast.success("Expense added successfully!");
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (error) {
      toast.error("Failed to add expense");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="expense-card">
      <div className="card-header">
        <h2>Add New Expense</h2>
        <p>Track your spending easily</p>
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Expense Title</label>
          <input
            id="title"
            type="text"
            placeholder="Dinner with friends"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount {`(${user.currency})`}</label>
          <div className="amount-input">
            <span className="currency">{user.currency}</span>
            <input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="category-select">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Add Expense
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
