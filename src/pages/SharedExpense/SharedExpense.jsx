import { useEffect, useState } from "react";
import API from "../../config/axios";
import { toast } from "react-toastify";
import BackHeader from "../../component/BackHeader/BackHeader";
import "./sharedExpense.css";

const SharedExpenses = () => {
  const [sharedExpenses, setSharedExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSharedExpenses = async () => {
    try {
      const res = await API.get("/expenses/shared");
      setSharedExpenses(res.data.shared);
    } catch (err) {
      toast.error("Failed to load shared expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (expenseId) => {
    try {
      await API.post(`/expenses/mark-paid/${expenseId}`);
      toast.success("Marked as paid");
      fetchSharedExpenses();
    } catch (err) {
      toast.error("Failed to mark as paid");
    }
  };

  useEffect(() => {
    fetchSharedExpenses();
  }, []);

  return (
    <>
      <BackHeader title="Shared Expenses" to="/" />
      <div className="shared-expense-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading shared expenses...</p>
          </div>
        ) : sharedExpenses.length === 0 ? (
          <div className="empty-state">
            <img src="/images/no-expenses.svg" alt="No expenses" />
            <p>No shared expenses found</p>
          </div>
        ) : (
          <div className="shared-expense-grid">
            {sharedExpenses.map((expense) => (
              <div key={expense._id} className="shared-expense-card">
                <div className="expense-header">
                  <h3 className="expense-title">{expense.title}</h3>
                  <span className={`expense-status ${expense.sharedWith[0].paid ? 'paid' : 'pending'}`}>
                    {expense.sharedWith[0].paid ? 'Paid' : 'Pending'}
                  </span>
                </div>
                
                <div className="expense-details">
                  <div className="detail-row">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">₹{expense.sharedWith[0].amount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Pay to:</span>
                    <span className="detail-value">
                      {expense.createdBy.name} ({expense.createdBy.email})
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">UPI ID:</span>
                    <span className="detail-value upi-id">
                      {expense.createdBy.upiId || 'Not provided'}
                    </span>
                  </div>
                </div>

                {!expense.sharedWith[0].paid && (
                  <div className="expense-actions">
                    {expense.createdBy.upiId && (
                      <a
                        href={`upi://pay?pa=${expense.createdBy.upiId}&am=${expense.sharedWith[0].amount}&tn=${encodeURIComponent(expense.title)}`}
                        className="payment-button upi-pay-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pay via UPI
                      </a>
                    )}
                    <button
                      className="payment-button mark-paid-button"
                      onClick={() => handleMarkPaid(expense._id)}
                    >
                      Mark as Paid
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SharedExpenses;