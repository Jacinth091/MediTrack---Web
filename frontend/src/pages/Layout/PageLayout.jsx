// PageLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavItemsConfig from "../../utils/NavItemsConfig";
import AsideBar from "./AsideBar";

const PageLayout = () => {
  const [isAsideOpen, setAsideOpen] = useState(true);
  const [navItems, setNavItems] = useState([]);
  const handleGetNavItems =() => {
    const userRole = "admin";
    const navItemsConfig = NavItemsConfig();
    setNavItems(navItemsConfig[userRole] || [])
  }

  useEffect(()=>{
    handleGetNavItems();
  }, [])

  return (
    <div className="min-h-screen flex">
      <AsideBar
        navItems={navItems}
        isAsideOpen={isAsideOpen}
        setAsideOpen={setAsideOpen}
      />
      <main className="flex-1 lg:ml-60 min-h-screen px-6 py-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
