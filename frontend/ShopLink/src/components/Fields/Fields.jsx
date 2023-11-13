import PropTypes from "prop-types";
const Fields = ({
  label,
  type,
  value,
  placeholder = null,
  handleChange,
 
}) => {
    const handleInputKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default Enter key behavior
      }
    };

  const commonInputClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none bg-gray-200 placeholder:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="mb-3">
      <div className="mb-2">
        <label className="text-sm text-center dark:text-gray-400">
          {label}
        </label>
      </div>
     
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`${commonInputClass}`}
          onKeyDown={handleInputKeyDown}
        />
      
    </div>
  );
};

Fields.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  optionsArray: PropTypes.arrayOf(PropTypes.string),
};

export default Fields;
