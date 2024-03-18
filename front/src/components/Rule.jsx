import { useState } from "react";
import PropTypes from "prop-types";

const Rule = ({ id, index, value, onRemove, onInputChange }) => {
  const [ruleValue, setRuleValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setRuleValue(newValue);
    onInputChange(id, newValue); // Pass the id instead of index
  };

  const handleRemoveClick = () => {
    onRemove(id); // Use a closure to tie the remove button to this rule's id
  };

  return (
    <div className="rule-row">
      <p>
        {index + 1}.{" "}
        <input type="text" value={ruleValue} onChange={handleInputChange} />
      </p>
      <button type="button" className="remove-btn" onClick={handleRemoveClick}>
        Remove
      </button>
    </div>
  );
};

Rule.propTypes = {
  id: PropTypes.number.isRequired, // Add id to PropTypes
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Rule;
