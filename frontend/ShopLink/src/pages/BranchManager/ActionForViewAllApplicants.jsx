const ActionForViewAllApplicants = ({ menuItems }) => {
    return (
      <div className="absolute w-[126px] bg-white rounded text-sm right-0 mt-2 max-w-xs transition-all duration-[400ms]  dark:bg-gray-900 dark:text-gray-400">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="block w-full p-1 hover:bg-primary hover:text-white"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };
  
  export default ActionForViewAllApplicants;
  