import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          className="flex h-16 items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <div className="flex flex-row p-1">
              <h1 className="mr-2 text-3xl font-bold text-orange-500">HELP</h1>
              <h1 className="text-3xl font-bold text-blue-500">NOTES</h1>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
          >
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/search"
                className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                aria-label="Search"
              >
                <FaSearch className="text-xl" />
              </Link>
              <Link
                to="/upload"
                className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                aria-label="Upload"
              >
                <MdOutlineFileUpload className="text-2xl" />
              </Link>
              <Link
                to="/profile"
                className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                {user?.userName || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-700 transition-colors hover:text-blue-600 md:hidden dark:text-gray-200"
          aria-label="Toggle menu"
        >
          {menuOpen ? <GiCancel /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-20 z-40 w-full space-y-4 bg-white p-6 shadow-lg md:hidden dark:bg-gray-800"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/search"
                  onClick={closeMenu}
                  className="flex items-center py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  <FaSearch className="mr-2" /> Search
                </Link>
                <Link
                  to="/upload"
                  onClick={closeMenu}
                  className="flex items-center py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  <MdOutlineFileUpload className="mr-2" /> Upload
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block w-full rounded-xl bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {user?.userName || "Profile"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full rounded-xl bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block w-full rounded-xl bg-gray-200 px-4 py-2 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Signup
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
