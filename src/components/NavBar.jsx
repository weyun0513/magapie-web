// src/components/NavBar.jsx
import React, { useState } from "react";
import logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="w-screen bg-black text-white text-xs md:text-sm">
        <div className=" flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-2 md:gap-0">
          <span className="uppercase tracking-wider">Professionally crafted, warmly embraced</span>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs md:text-sm">
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl" />
            <a href="mailto: Magpielearningcentre@gmail.com" className="text-white  hover:text-blue-400 flex items-center gap-1">
              Email:  Magpielearningcentre@gmail.com
            </a>
            <a href="tel:+17783002366" className="text-white hover:text-blue-400 flex items-center gap-1">
              Phone: (778) 300-2366
            </a>
            <div className="flex gap-3 pr-10">
              <a href="https://www.facebook.com/profile.php?id=61576759251349" className="text-white hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
              {/* <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-linkedin-in"></i></a> */}
              {/* <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-tiktok"></i></a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-sm sticky top-0">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-10 px-4"></div>
        <div className=" flex justify-between items-center h-10 pb-10">

          <div className="flex pl-20 items-center">
            <img src={logo} className="w-20 h-auto" />
          </div>

          <ul className="hidden pr-20 md:flex items-center space-x-1 text-gray-700 font-medium">
            <li><a href="/" className="px-3 py-2 hover:text-blue-600 transition-colors">Home</a></li>

            <li className="relative group">
              <a href="/programs" className="px-3 py-2 hover:text-blue-600 transition-colors flex items-center">
                Programs

              </a>
            </li>
            <li className="relative group">
              <a href="/activity" className="px-3 py-2 hover:text-blue-600 transition-colors flex items-center">
                Activity
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </a>
              <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                <li>
                  <a
                    href="/activity/summer-camp"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Summer Camp
                  </a>
                </li>
                <li>
                  <a
                    href="/activity/winter-camp"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Winter Camp
                  </a>
                </li>
                <li>
                  <a
                    href="/activity/events"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </li>
            {/* <li><a href="/faqs" className="px-3 py-2 hover:text-blue-600 transition-colors">FAQs</a></li> */}
            {/* <li><a href="/franchise" className="px-3 py-2 hover:text-blue-600 transition-colors">Franchise</a></li> */}
            {/* <li><a href="/bookstore" className="px-3 py-2 hover:text-blue-600 transition-colors">Bookstore</a></li> */}
            {/* <li><a href="/blog" className="px-3 py-2 hover:text-blue-600 transition-colors">Blog</a></li> */}
            {/* <li>
              <a href="/locations" className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                LOCATIONS
              </a>
            </li> */}
            <li>
              <a href="/book" className=" ml-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1 font-medium">
                BOOK
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <ul className="py-2 text-gray-700 font-medium">
              <li><a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a></li>
              <li><a href="/about" className="block px-4 py-2 hover:bg-gray-100">About</a></li>
              <li><a href="/programs" className="block px-4 py-2 hover:bg-gray-100">Programs</a></li>
              {/* <li><a href="/grade-levels" className="block px-4 py-2 hover:bg-gray-100">Grade Levels</a></li> */}
              {/* <li><a href="/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</a></li> */}
              {/* <li><a href="/franchise" className="block px-4 py-2 hover:bg-gray-100">Franchise</a></li> */}
              {/* <li><a href="/bookstore" className="block px-4 py-2 hover:bg-gray-100">Bookstore</a></li> */}
              {/* <li><a href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</a></li> */}
              <li><a href="/locations" className="block px-4 py-2 hover:bg-gray-100 font-semibold text-blue-600">LOCATIONS</a></li>
              <li>
                <a href="/book" className="block mx-4 mt-2 bg-blue-500 text-white py-2 text-center rounded-full flex items-center justify-center gap-1">
                  BOOK
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        )}

      </nav>
    </>
  );
};

export default NavBar;  // 正確：匯出 NavBar