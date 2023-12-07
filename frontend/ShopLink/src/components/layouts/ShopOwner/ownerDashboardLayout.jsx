import PropTypes from "prop-types";
import Header from "../../Headers/Header";
import useSidebar from "../../../hooks/useSidebar";
import Sidebar from "../../sidebar/ShopOwnerBar/OwnerBar";

const ownerDashboardLayout = ({ children }) => {
  const [sidebarVisible, toggleSidebar] = useSidebar();
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar sidebarVisible={sidebarVisible} />
      <main className="pt-20 px-4 min-h-screen w-screen ml-0 md:ml-[20%] md:px-10 md:pt-20 md:pb-10 bg-[#F2F4F4] dark:bg-gray-700 scrollbar-hide md:w-[80vw]">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

ownerDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ownerDashboardLayout;
