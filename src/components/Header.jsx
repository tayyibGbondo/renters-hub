import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Function to determine the route path
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <>
      <div className="bg-white border-b shadow-sm sticky top-0 z-50 py-3">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          {/* LOGO */}
          <div>
            <Link to="/">LOGO</Link>
          </div>

          {/* NAV LINKS */}
          <ul className=" flex space-x-10">
            <li>
              <Link
                to="/"
                className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMathRoute("/") && "text-black border-b-red-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/offer"
                className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMathRoute("/offer") && "text-black border-b-red-500"
                }`}
              >
                Offer
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMathRoute("/signin") && "text-black border-b-red-500"
                }`}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}
