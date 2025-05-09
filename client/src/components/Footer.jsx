import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* About Us */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-blue-500">
              About Us
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Because your planning is not always perfect, you need to be able to
              study whenever, wherever. Just read your notes one last time on your
              tablet or phone while you're on the go.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-xl font-bold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-blue-500">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-4 text-xl font-bold relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-blue-500">
              Contact Info
            </h2>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="tel:+919987990097" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">
                      +91 90269 12803
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="tel:+919764935361" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">
                      +91 95651 28611
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="mailto:findmynotes2022@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm break-all">
                      ankitpjlko143@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-300">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex justify-center space-x-6 mb-4 md:mb-0">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-lg"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-lg"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-pink-500 transition-colors duration-200 text-lg"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-blue-700 transition-colors duration-200 text-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {currentYear} HelpNotes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;