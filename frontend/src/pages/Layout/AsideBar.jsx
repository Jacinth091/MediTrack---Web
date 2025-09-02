import {
  Activity,
  BarChart3,
  Calendar,
  ClipboardList,
  FileText,
  Heart,
  LogOut,
  Menu,
  Settings,
  Shield,
  Stethoscope,
  User,
  Users,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

// Map for FontAwesome string icons → Lucide fallback icons
const iconMap = {
  "fas fa-tachometer-alt": Activity,
  "fas fa-users-cog": Users,
  "fas fa-user-shield": Shield,
  "fas fa-clipboard-list": ClipboardList,
  "fas fa-chart-line": BarChart3,
  "fas fa-cog": Settings,
  "fas fa-calendar-check": Calendar,
  "fas fa-calendar-alt": Calendar,
  "fas fa-user-injured": Users,
  "fas fa-notes-medical": FileText,
  "fas fa-file-prescription": FileText,
  "fas fa-boxes": ClipboardList,
  "fas fa-user-plus": User,
  "fas fa-home": Heart,
  "fas fa-sign-in-alt": LogOut,
};

const AsideBar = ({ navItems, isAsideOpen, setAsideOpen, userRole }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const sidebarRef = useRef();
  const location = useLocation();
  const {logout} = useAuth()
  const [isRoleMedicalPersonel , setIsRoleMedicalPersonel] = useState(false);

  // fallback if no navItems passed
  const defaultNavItems = [
    { icon: Activity, text: "Dashboard", path: "dashboard", badge: null },
    { icon: Users, text: "Patients", path: "patients", badge: "24" },
    { icon: Calendar, text: "Appointments", path: "appointments", badge: "12" },
    { icon: FileText, text: "Records", path: "records", badge: null },
    { icon: Stethoscope, text: "Consultations", path: "consultations", badge: "3" },
  ];

  const menuItems = navItems || defaultNavItems;

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout()
      // replace with your logout logic
    } catch (error) {
      console.log("Logout Failed!: ", error);
    }
  };


  // Resize tracking
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    setIsRoleMedicalPersonel(userRole === 'doctor' || userRole === 'nurse' || userRole === 'receptionist')
  }, [userRole])

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isDesktop && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setAsideOpen(false);
      }
    };
    if (isAsideOpen && !isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAsideOpen, isDesktop, setAsideOpen]);

  return (
    <>
      {/* Mobile menu button */}
      {!isDesktop && !isAsideOpen && (
        <button
          onClick={() => setAsideOpen(true)}
          className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop */}
      {!isDesktop && isAsideOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setAsideOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-200 shadow-xl
          transition-transform duration-300 ease-in-out flex flex-col
          ${isAsideOpen || isDesktop ? "translate-x-0" : "-translate-x-full"}
          ${isDesktop ? "w-72" : "w-80"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900">MediTrack</h2>
              <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">{userRole || "Healthcare"}</p>
            </div>
          </div>
          {!isDesktop && (
            <button onClick={() => setAsideOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Profile */}
        {/* <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">Dr. Sarah Johnson</h3>
              <p className="text-xs text-gray-600">Chief Medical Officer</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = typeof item.icon === "string" ? iconMap[item.icon] || Activity : item.icon;
            const isActive = location.pathname.includes(item.path);

            return (
              <Link
                key={index}
                to={`/${userRole}/${item.path}`}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                    ${isActive ? "bg-white bg-opacity-20" : "bg-gray-100 group-hover:bg-blue-100"}`}>
                    <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">{item.text}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full min-w-[1.5rem] text-center
                    ${isActive ? "bg-white bg-opacity-20 text-white" : "bg-red-500 text-white"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {isRoleMedicalPersonel && (
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-sm font-semibold text-red-800">Emergency Protocol</span>
              </div>
              <p className="text-xs text-red-700 mb-3">
                Quick access to emergency procedures and critical patient alerts.
              </p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                Emergency Dashboard
              </button>
            </div>
          </div>
        )}



        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 group-hover:text-red-600" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">MediTrack v2.1.0</p>
            <p className="text-xs text-gray-400 mt-1">Healthcare Management System</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AsideBar;
