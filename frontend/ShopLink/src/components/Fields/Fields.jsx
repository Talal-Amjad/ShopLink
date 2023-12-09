import PropTypes from "prop-types";

const Fields = ({
  label,
  type,
  name, 
  value,
  placeholder = null,
  handleBlur,
  handleChange,
  error,
}) => {
  const commonInputClass =
    "w-full p-2 border border-gray-300 rounded-md outline-none bg-gray-200 placeholder:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="mb-3">
      <div className="mb-2">
        <label className="text-[18px] text-center dark:text-gray-400">
          {label}
        </label>
      </div>

      {type === "textarea" ? (
        <div>
          <textarea
            value={value}
            placeholder={placeholder}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${commonInputClass} ${
              error ? "border-red-500" : ""
            }`}
            rows={4} 
          />
          {error && (
            <small className="text-red-500 p-0 m-0">{error}</small>
          )}
        </div>
      ) : (
        <div>
          <input
            type={type}
            name={name} 
            value={value}
            placeholder={placeholder}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${commonInputClass} ${
              error ? "border-red-500" : ""
            }`}
          />
          {error && (
            <small className="text-red-500 p-0 m-0">{error}</small>
          )}
        </div>
      )}
    </div>
  );
};

Fields.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleBlur:PropTypes.func,
  handleChange: PropTypes.func,
  error: PropTypes.string,
  optionsArray: PropTypes.arrayOf(PropTypes.string),
};

export default Fields;
