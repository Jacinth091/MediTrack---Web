import {
  Activity,
  BarChart3,
  Calendar,
  ChevronFirst,
  ClipboardList,
  FileText,
  Heart,
  LogOut,
  Settings,
  Shield,
  User,
  Users
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

// import NavItemsConfig from "../../utils/NavItemsConfig";



export const Sidebar =({ navItems, isAsideOpen, setAsideOpen, userRole }) => {
  const sidebarRef = useRef();
  const menuItems = navItems;

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
  console.log(menuItems)
  return(
    <aside 
    ref = {sidebarRef}
    className="fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-200 shadow-xl
          transition-transform duration-300 ease-in-out flex flex-col">

      {/* Header Part */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-900">MediTrack</h2>
            <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">{userRole || "Healthcare"}</p>
          </div>
            <button 
              onClick={() => setAsideOpen(!isAsideOpen)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <ChevronFirst className={`transform ${isAsideOpen ? '' : 'rotate-180'}`} />
            </button>
        </div>
      </header>


      {/* Navigation Links */}
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
                    <Icon className= "w-4 h-4 text-gray-600 group-hover:text-blue-600" />
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

        {/*  Logout button */}
      <div className="p-4 border-b border-gray-200">
        <button
          // onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 group-hover:text-red-600" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>

      </div>
      
      <footer className="p-4 border-t border-gray-200">
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">MediTrack v2.1.0</p>
          <p className="text-xs text-gray-400 mt-1">Healthcare Management System</p>
        </div>
      </footer>

      {/* <nav className = "h-full flex flex-col bg-white border-r shadow-sm">
        <div className = "p-4 pb-2 flex justify-between items-center">
          <button className = "p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst/>
          </button>
        </div>
        <ul className ="flex-1 px-3"></ul>
        <div className="border-t flex p-3">
          <img src="https://www.youtube.com/@ycldev" alt="" className="w-10 h-10 rounded-md" />
          <div className={`
            flex justify-between items-center
            w-52 ml-3  
            `}>
           <div>
              <h4 className="font-semibodl">
                John Doe
              </h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
           </div>
           <MoreVertical/>
          </div>
        </div>
      </nav> */}
    </aside>
  )
}



export const SidebarItem = ({icon, text, active, alert}) =>{

}