import { useState } from "react";

const useSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return [sidebarVisible, toggleSidebar];
};

export default useSidebar;
