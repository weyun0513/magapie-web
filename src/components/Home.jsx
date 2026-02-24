import React, { useState } from "react";
import NavBar from "../components/NavBar";
import emailjs from "@emailjs/browser";
import banner from '../assets/logobanner_w.png';
import banner2 from '../assets/banner2.jpeg';

import qrcode from "../assets/qr_wechat.png";

const Home = () => {
  // ... (保持你原有的狀態、函數和 marqueeItems 不變) ...
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_Public_Key;
  const CONTACTMAIL = import.meta.env.VITE_CONTACT_EMAIL;

  const [status, setStatus] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [showQR, setShowQR] = useState(false); // 修正：加上原有的 QR 狀態

  const marqueeItems = [
    {
      text: "🎉 春假託管班 招生啦",
      type: "image",
      content: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770714104/poster2_in1hy8.jpg"
    } 
  ];

  const openModal = (e, imgUrl) => {
    e.preventDefault();
    setSelectedImg(imgUrl);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    grade: "",
    location: "Richmond",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      subject: "",
      grade: "",
    });
    const templateParams = {
      name: formData.firstName + " " + formData.lastName,
      tel: formData.phone,
      email: formData.email,
      message: `Grade: ${formData.grade}, Subject: ${formData.subject}`,
      to_email: CONTACTMAIL,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then(() => {
        alert("Thank you! Your message has been sent.");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          subject: "",
          grade: "",
          location: "Richmond",
        });
      })
      .catch((err) => {
        console.error("發送失敗", err);
        setStatus("發送失敗，請稍後再試");
        alert("Submission failed. Please try again.");
      });
  };

  const images = [
    "https://res.cloudinary.com/dux3mbryw/image/upload/v1763021015/program2_zj75i6.jpg",
    "https://res.cloudinary.com/dux3mbryw/image/upload/v1763021013/program4_lofjsd.jpg",
    "https://res.cloudinary.com/dux3mbryw/image/upload/v1763021812/program1_eupzcz.jpg",
    "https://res.cloudinary.com/dux3mbryw/image/upload/v1763022058/program1_oryzkz.jpg"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* --- 走馬燈區塊 --- */}
      <div className="relative overflow-hidden bg-white py-2 text-white h-12 flex items-center">
        <div className="absolute whitespace-nowrap flex animate-marquee">
          {[1, 2].map((loop) => (
            <div key={loop} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a
                    href={item.type === "link" ? item.content : "#"}
                    target={item.type === "link" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (item.type === "image") openModal(e, item.content);
                    }}
                    className="mx-8 hover:underline font-medium flex items-center gap-2 cursor-pointer"
                  >
                    {item.text}
                  </a>
                  <span className="mx-8 text-blue-200">|</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- 1. Hero Banner: 調整為圖片中的大標題效果 --- */}
      {/* 第一個區塊：將 py-20 改為 pt-20 (只保留上邊距) */}
      <div className="bg-blue-100 pt-10 pb-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left md:w-1/2 space-y-5">
            {/* 第一段：主標題 - 展現氣勢 */}
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Magpie Learning Centre <br />
              <span className="text-blue-600">Takes Flight</span>
            </h1>

            {/* 第二段：副標題 - 增加品牌權威感 */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {/* 增加一個裝飾用的小橫線，讓設計感提升 */}
              <div className="hidden md:block w-8 h-[2px] bg-blue-400"></div>
              <p className="text-lg md:text-xl text-gray-500 font-medium tracking-wide uppercase italic">
                Richmond's Premiere After School Enrichment Destination
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={banner}
              className="w-full max-w-xl shadow-2xl rounded-xl shadow-xl  "
              alt="Hero"
            />
          </div>
        </div>
      </div>

      {/* 第二個區塊：移除 py 並改用 pb-20 (只保留下邊距)，這樣它就會「吸」上去 */}
      <div className="bg-blue-100 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              Welcome to Magpie Learning Centre
            </h1>
            <div className="flex items-center gap-3 pt-10 justify-center md:justify-start">
              {/* 增加一個裝飾用的小橫線，讓設計感提升 */}
              <div className="hidden md:block w-8 h-[2px] bg-blue-400"></div>
              <p className="text-lg md:text-xl text-gray-500 font-medium tracking-wide uppercase italic">
                Empowering young minds through personalized mentorship and creative discovery.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={banner2}
              className="w-full max-w-xl shadow-2xl rounded-xl shadow-xl  "
              alt="Hero"
               onClick={(e) => {
                     openModal(e, "https://res.cloudinary.com/dux3mbryw/image/upload/v1770714104/poster2_in1hy8.jpg");
                    }}
            />
          </div>
        </div>
      </div>

      {/* --- 2. Main Content: 核心內容區塊優化 --- */}
      {/* 使用 max-w-7xl mx-auto 讓內容居中並限制寬度 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16  bg-yellow-50 relative z-10"> {/* 加上 -mt-10 讓它稍微往上疊一點 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"> {/* items-start 確保內容從頂部對齊 */}
          {/* 左側：介紹與聯絡資訊 */}
          <div>

            <p className="text-gray-700 mb-4 leading-relaxed text-lg">
              <strong>Master the Fundamentals. Spark Creativity. Build Confidence.</strong> At Magpie Learning Center, we believe every child deserves a personalized path to success. That’s why each student receives one-on-one guidance from a dedicated tutor and a fully customized learning plan—tailored to their pace, interests, and goals.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              在 Magpie，我們幫助孩子打好學習基礎，激發創意，建立自信。
            </p>


            <div className="space-y-4 text-xl mt-8">
              <p className="flex items-center gap-3 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Location: <strong>260-8360 Granville Ave, Richmond, BC, Canada</strong>
              </p>
              <p className="flex items-center gap-3 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Phone: <a href="tel:+16043180198" className="text-blue-600 hover:underline">+1 778-300-2366/604-700-0234</a>
              </p>
              <p className="flex items-center gap-3 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email: <a href="mailto:Magpielearningcentre@gmail.com" className="text-blue-600 hover:underline">Magpielearningcentre@gmail.com</a>
              </p>
            </div>

            {/* Google Maps */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5218.059841522045!2d-123.13173180000001!3d49.1620403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54860ab45f700001%3A0xd3c87353b074b264!2s8360%20Granville%20Ave%20%23260%2C%20Richmond%2C%20BC%20V6Y%201N4!5e0!3m2!1szh-TW!2sca!4v1762591771507!5m2!1szh-TW!2sc"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* 右側：表單區塊 */}
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col justify-between"> {/* 增加 flex-col justify-between 確保內容填滿高度 */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                <img
                  src={qrcode}
                  alt="WeChat QR Code"
                  className="h-14 ml-4 cursor-pointer"
                  onClick={() => setShowQR(true)} // 點擊 QR code 顯示彈窗
                />
              </div>
              <p className="text-gray-600 mb-8 text-lg">
                Have a question or want to learn more about our educational services? Send us a message and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="firstName" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName" placeholder="Ma" required value={formData.lastName} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" id="phone" name="phone" placeholder="(778) 300-2366" required value={formData.phone} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject(s)
                  </label>
                  <input type="text" id="subject" name="subject" placeholder="Math, English, etc." value={formData.subject} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Grade Level
                  </label>
                  <select id="grade" name="grade" value={formData.grade} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Grade</option>
                    <option>Kindergarten</option>
                    <option>Elementary (1-6)</option>
                    <option>Middle School (7-8)</option>
                    <option>High School (9-12)</option>
                  </select>
                </div>

                {/* --- BOOK NOW 按鈕：應用新的樣式 --- */}
                <button
                  type="submit"
                  className="w-full bg-[#4285F4] text-white py-4 px-6 rounded-full font-bold hover:bg-blue-600 transition-all duration-300 flex items-center justify-between group shadow-lg mt-8"
                >
                  <span className="flex-1 text-center tracking-wider ml-4">BOOK NOW</span>
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 下方四張圖片區塊 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`program-${index}`} className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedImg(src)} />
          ))}
        </div>
      </div>

      {/* --- QR Code 彈窗 (複製你的原始邏輯) --- */}
      {showQR && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div className="relative flex flex-col items-center justify-center pointer-events-none">
            <button
              className="absolute top-6 right-6 text-white text-5xl p-2 pointer-events-auto hover:scale-110 transition-transform"
              onClick={() => setShowQR(false)}
            >
              ✕
            </button>
            <img
              src={qrcode}
              alt="WeChat QR Code"
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-auto border-4 border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/70 text-sm mt-6 pointer-events-none tracking-[0.2em] font-light uppercase">
              Scan to connect / Click outside to close
            </p>
          </div>
        </div>
      )}

      {/* --- 圖片放大彈窗 (Modal) --- */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full pointer-events-none">
            <button
              className="absolute top-6 right-6 text-white text-5xl p-2 pointer-events-auto hover:scale-110 transition-transform"
              onClick={() => setSelectedImg(null)}
            >
              ✕
            </button>
            <img
              src={selectedImg}
              alt="Zoomed Content"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-auto border-4 border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/70 text-sm mt-6 pointer-events-none tracking-[0.2em] font-light uppercase">
              Click anywhere outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;