import PropTypes from "prop-types";

const Button = ({ text, onClick = null, type, roundedFull = false, bgColor = "primary" }) => {
  let textColor, borderColor, hoverBgColor;

  switch (bgColor) {
    case "primary":
      textColor = "text-white";
      borderColor = "border-primary";
      hoverBgColor = "hover:bg-[#6495ED]";
      break;
    case "none":
      textColor = "text-primary";
      borderColor = "border-primary";
      hoverBgColor = "";
      break;
    default:
      textColor = "text-white";
      borderColor = "border-primary";
      hoverBgColor = "";
      break;
  }

  const buttonClassName = `bg-${bgColor} ${textColor} border ${borderColor} py-2 px-4 ${
    roundedFull ? "rounded-full" : "rounded-lg"
  } cursor-pointer w-full ${hoverBgColor} md:my-4`;

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
  roundedFull: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "none"]),
};

export default Button;
