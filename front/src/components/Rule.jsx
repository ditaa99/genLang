import { useState } from "react";
import PropTypes from "prop-types";

const Rule = ({ index, value, onRemove, onInputChange }) => {
  const [ruleValue, setRuleValue] = useState(value); // State to hold the rule value

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setRuleValue(newValue); // Update the ruleValue state
    onInputChange(index, newValue); // Call the onInputChange function from props
  };

  return (
    <div key={index} className="rule-row">
      <p>
        {index + 1}.{" "}
        <input
          type="text"
          value={ruleValue}
          onChange={handleInputChange} // Call handleInputChange when input changes
        />
      </p>
      <button
        type="button"
        className="remove-btn"
        value="Remove"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
};

Rule.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Rule;
