// AsideBar.jsx
import { Link, useLocation } from "react-router-dom";

const AsideBar = ({ navItems, isAsideOpen, setAsideOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white shadow-lg transform 
      ${isAsideOpen ? "translate-x-0" : "-translate-x-full"} 
      transition-transform duration-300 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">MediTrack</h2>
        <button
          onClick={() => setAsideOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="mt-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 transition-colors
                ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}
              `}
            >
              <i className={item.icon}></i>
              <span>{item.text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AsideBar;
