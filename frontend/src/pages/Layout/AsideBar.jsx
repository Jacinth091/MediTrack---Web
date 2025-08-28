import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../Context/AuthProvider';

const AsideBar = ({ navItems,isAsideOpen, setAsideOpen, userRole }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const sidebarRef = useRef();
  const {logout} = useAuth();

  const handleLogout = async ()=>{
    try {
      await logout();
    } catch (error) {
      console.log("Logout Failed!: ", error)
    }
  }
  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <AnimatePresence>
        {(isAsideOpen || isDesktop) && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[15rem] fixed z-50 top-0 left-0 bg-gray-800 text-white
                       h-full flex flex-col gap-4 p-4 overflow-hidden lg:block"
            aria-label="Sidebar Navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="font-bold">MediTrack</h2>
              {!isDesktop && (
                <button onClick={() => setAsideOpen(false)}>✕</button>
              )}
            </div>
            {/* Sidebar Links */}
            <nav className="mt-4 flex flex-col gap-2">
              {navItems.map((item, index) => {
                  const isActive = location.pathname.includes(item.path);
                  return (
                    <Link
                      key={index}
                      to={`/${userRole}/${item.path}`}
                      className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-300 `}
                    >
                      <i className={item.icon}></i>
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
            </nav>
            <button onClick={handleLogout}>
                Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
      {!isDesktop && !isAsideOpen && (
        <button
          onClick={() => setAsideOpen(true)}
          className="fixed top-4 left-4 z-50 bg-[#074873] text-white p-2 rounded-md"
        >
          <i className="fas fa-bars"></i>
        </button>
      )}
    </>
  );
};

export default AsideBar;
