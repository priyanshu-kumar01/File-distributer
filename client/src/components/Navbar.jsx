import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-cyan-300">
              Navbar
            </Link>
          </div>

          <div className="flex space-x-6">
            {token && (
              <Link to="/" className="hover:text-cyan-400 transition duration-300">
                Dashboard
              </Link>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="hover:text-cyan-400 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-cyan-400 transition duration-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
