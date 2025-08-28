// PageLayout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import NavItemsConfig from "../../utils/NavItemsConfig.js";
import AsideBar from "./AsideBar";

const PageLayout = () => {
  const [isAsideOpen, setAsideOpen] = useState(true);
  const [navItems, setNavItems] = useState([]);
  const {user, isLoading} =useAuth();


  useEffect(() => {
    if (!isLoading && user?.role) {
      const navItemsConfig = NavItemsConfig();
      const navItemsForRole = navItemsConfig[user?.role.toLowerCase()] || []
      setNavItems(navItemsForRole);
    }
  }, [user, isLoading]);
  // console.log("PageLayout rendered");
  // console.log("User role:", user?.role);
  // console.log("Nav items:", navItems);
  return (
    <div className="min-h-screen flex">
      <AsideBar
        navItems={navItems}
        isAsideOpen={isAsideOpen}
        setAsideOpen={setAsideOpen}
        userRole={user?.role.toLowerCase()}
      />
      <main className="flex-1 lg:ml-60 min-h-screen px-6 py-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
