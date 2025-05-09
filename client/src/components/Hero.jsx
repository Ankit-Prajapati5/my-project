import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center bg-cover bg-center bg-[url('/img/bg.jpg')] bg-no-repeat">
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl px-6 text-center text-white"
      >
        <motion.h1 
          className="text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          HELP NOTES
        </motion.h1>
        
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed sm:text-xl md:mt-8 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Welcome to Help Notes - where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks and streamline your study routine.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {isAuthenticated ? (
            <Link
              to="/search"
              className="transform rounded-xl bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10 sm:py-4"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="transform rounded-xl bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10 sm:py-4">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="transform rounded-xl border-2 border-white bg-transparent px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-white/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10 sm:py-4">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;