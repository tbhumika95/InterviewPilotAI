import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Resume",
      path: "/upload-resume",
      icon: "📄",
    },
    {
      name: "New Interview",
      path: "/interview/setup",
      icon: "🎤",
    },
    {
      name: "History",
      path: "/history",
      icon: "📊",
    },
  ];

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between">

      <div>

        <div className="p-8">

          <h1 className="text-3xl font-bold text-white">
            InterviewPilot AI
          </h1>

          <p className="text-zinc-400 mt-2">
            AI Mock Interview Platform
          </p>

        </div>

        <nav className="px-4 space-y-2">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition ${
                pathname === menu.path
                  ? "bg-blue-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <span>{menu.icon}</span>

              <span>{menu.name}</span>

            </Link>

          ))}

        </nav>

      </div>

      <div className="p-6 border-t border-zinc-800">

        <p className="text-white font-semibold">
          {user?.name}
        </p>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 rounded-xl py-3"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;