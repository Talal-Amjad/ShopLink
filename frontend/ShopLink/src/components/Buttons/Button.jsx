import PropTypes from "prop-types";

const Button = ({ text, onClick = null, type}) => {
  const textColor = "text-white";
  const borderColor = "border-primary";
  const hoverBgColor = "hover:bg-[#6495ED]";
  const buttonClassName = `bg-primary ${textColor} border ${borderColor} py-2 px-4 cursor-pointer w-full ${hoverBgColor} md:my-4 rounded`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
 
};

export default Button;
