import PropTypes from "prop-types";

const UserLayout = ({ children1,children }) => {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
            {children1}
      <main className="bg-gray-100 min-h-screen dark:bg-gray-700 ">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;