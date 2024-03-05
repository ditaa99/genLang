import PropTypes from 'prop-types';

const Rule = ({ index, value, onRemove }) => {
  return (
    <div key={index} className="rule-row">
      <p>
         {index + 1}.{" "}
        <input
          type="text"
          value={value}
          onChange={(e) => onRemove(index, e.target.value)}
        />
      </p>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

Rule.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Rule;
