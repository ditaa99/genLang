import { useState } from "react";
import PropTypes from "prop-types";

const Rule = ({ id, index, value, onInputChange, onRemove, placeholder }) => {
  const [ruleValue, setRuleValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setRuleValue(newValue);
    onInputChange(id, newValue);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="rule-row">
      <p>
        {index + 1}. &nbsp;
        <input
          type="text"
          value={ruleValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </p>
      <button type="button" className="remove-btn" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

Rule.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Rule.defaultProps = {
  placeholder: 'S - aS',
};

export default Rule;