// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  // const [showQR, setShowQR] = useState(false);
  return (
    <>
      {/* Top Bar */}
      <div className="w-screen bg-blue-950/80 text-white text-xs md:text-sm">

      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-[100] bg-white shadow-md w-full">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-3">

          {/* 左側：Logo + 文字組合 */}
          <div className="flex items-center gap-4"> {/* gap-4 控制圖片與文字間的距離 */}
            <Link to="/" className="flex items-center gap-3"> {/* 也可以直接把文字放進 Link 增加點擊範圍 */}
              <img src={logo} className="w-16 h-auto object-contain" alt="Logo" />
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                Magpie Learning Centre
              </h3>
            </Link>
          </div>
          {/* 右側：選單 */}
          <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><Link to="/programs" className="hover:text-blue-600 transition-colors">Programs</Link></li>

            {/* Activity 下拉選單 */}
            <li className="relative group">
              <button className="hover:text-blue-600 transition-colors flex items-center gap-1">
                Activity
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                <ul className="py-2">
                  <li><Link to="/activity/UpcomingActivities" className="block px-4 py-2 hover:bg-gray-100">Upcoming Activity</Link></li>
                  <li><Link to="/activity/PastActivities" className="block px-4 py-2 hover:bg-gray-100">Past Activities</Link></li>
                </ul>
              </div>
            </li>
             
            <li><Link to="/photoGallery" className="hover:text-blue-600 transition-colors">PhotoGallery</Link></li>

            {/* Book 按鈕 */}
            <li>
              <Link to="/book" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all flex items-center gap-2">
                BOOK
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
            
          </ul>

          {/* 手機版漢堡按鈕 */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

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
        {/* {
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
        } */}
      </nav >
    </>
  );
};

export default NavBar;  // 正確：匯出 NavBar