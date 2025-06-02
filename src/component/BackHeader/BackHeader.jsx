import { useNavigate } from "react-router-dom";
import "./BackHeader.css";

const BackHeader = ({ title = "Back", to = -1 }) => {
  const navigate = useNavigate();

  return (
    <header className="back-header">
      <button className="back-button" onClick={() => navigate(to)} aria-label="Go Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h2 className="back-title">{title}</h2>
    </header>
  );
};

export default BackHeader;
