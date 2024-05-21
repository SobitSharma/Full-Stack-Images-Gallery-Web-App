import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-gray-800 py-4">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/upload"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >
                Upload
              </NavLink>
              <NavLink
                to="/yourimages"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >
                Your Images
              </NavLink>
              <NavLink
                to="/viewall"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white"
              >     
                View All
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;