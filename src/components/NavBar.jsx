// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';
import qrcode from "../assets/qr_wechat.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  return (
    <>
      {/* Top Bar */}
      <div className="w-screen bg-black text-white text-xs md:text-sm">
        <div className="flex justify-between items-center px-4 py-2">

          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4 text-center md:text-left">

            <span className="uppercase tracking-wider">
              Professionally crafted, warmly embraced
            </span>


            <div className="flex flex-col md:flex-row items-center gap-2 md:pl-80 ">

              <FontAwesomeIcon
                icon={faEnvelope}
                className="hidden md:block text-white text-2xl "
              />

              <a
                href="mailto:Magpielearningcentre@gmail.com"
                className="text-white hover:text-blue-400 items-center gap-2"
              >
                Magpielearningcentre@gmail.com
              </a>

              <a href="tel:+17783002366" className="text-white hover:text-blue-400">
                Phone: (778) 300-2366
              </a>

              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61576759251349"
                className="text-white hover:text-blue-400"
              >
                <i className="fab fa-facebook-f"></i>&ensp;facebook
              </a>
            </div>
          </div>

          {/* QRCode（手機顯示 不要靠太右） */}
          <img
            src={qrcode}
            alt="QR"
            className="h-14 block md:hidden cursor-pointer mr-10"
            onClick={() => setShowQR(true)}
          />
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-sm sticky top-0 relative z-50 bg-white shadow">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-10 px-4"></div>
        <div className=" flex justify-between items-center h-10 pb-10">

          <div className="flex pl-20 items-center">
            <img src={logo} className="w-20 h-auto" />

          </div>

          <ul className="hidden pr-20 md:flex items-center space-x-1 text-gray-700 font-medium">

            <li><Link to="/" className="px-3 py-2 hover:text-blue-600 transition-colors">Home</Link></li>

            <li className="relative group">
              <Link to="/programs" className="px-3 py-2 hover:text-blue-600 transition-colors flex items-center">
                Programs
              </Link>
            </li>

            <li><Link to="/PastActivities" className="  block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">Activity</Link></li>
          
         
            <li>

              <Link to="/book" className=" ml-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1 font-medium">
                BOOK
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

            </li>
            <li>
              <img src={qrcode} alt="Logo" className="h-14 pl-2" onClick={() => setShowQR(true)} />
            </li>
          </ul >

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div >

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <ul className="py-2 text-gray-700 font-medium">
              <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link></li>
              <li><Link to="/programs" className="block px-4 py-2 hover:bg-gray-100">Programs</Link></li>
              <li>
                <button
                  onClick={() => setIsActivityOpen(!isActivityOpen)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                >
                  Activity
                  <svg
                    className={`w-4 h-4 transition-transform ${isActivityOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>

                {isActivityOpen && (
                  <ul className="pl-6">
                    <li><Link to="/activity" className="block px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsActivityOpen(false);
                    }}>Upcoming Activity</Link></li>
                    <li><Link to="/activity/PastActivities" onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsActivityOpen(false);
                    }} className="block px-4 py-2 hover:bg-gray-100 text-sm">Past Activities</Link></li>
                  </ul>
                )}
              </li>
              {/* <li><a href="/grade-levels" className="block px-4 py-2 hover:bg-gray-100">Grade Levels</a></li> */}
              {/* <li><a href="/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</a></li> */}
              {/* <li><a href="/franchise" className="block px-4 py-2 hover:bg-gray-100">Franchise</a></li> */}
              {/* <li><a href="/bookstore" className="block px-4 py-2 hover:bg-gray-100">Bookstore</a></li> */}
              {/* <li><a href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</a></li> */}
              {/* <li><a to="/locations" className="block px-4 py-2 hover:bg-gray-100 font-semibold text-blue-600">LOCATIONS</a></li> */}
              <li>
                <Link to="/book" className="block mx-4 mt-2 bg-blue-500 text-white py-2 text-center rounded-full flex items-center justify-center gap-1">
                  BOOK
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {
          showQR && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowQR(false)}
            >
              <div className="bg-white p-4 rounded shadow-xl">
                <img src={qrcode} alt="Large QR Code" className="h-64 w-64" />
              </div>
            </div>
          )
        }
      </nav >
    </>
  );
};

export default NavBar;  // 正確：匯出 NavBar