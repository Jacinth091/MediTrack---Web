// PageLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AsideBar from "./AsideBar";

const PageLayout = () => {
  const [isAsideOpen, setAsideOpen] = useState(true);

  const navItems = [
    { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
    { text: "Patients", icon: "fas fa-users", path: "patients" },
    { text: "Appointments", icon: "fas fa-calendar", path: "appointments" },
    { text: "Reports", icon: "fas fa-file-alt", path: "reports" },
  ];

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
