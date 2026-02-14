
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import emailjs from "@emailjs/browser";
import banner from '../assets/logobanner.png';
import qrcode from "../assets/qr_wechat.png";
const Book = () => {
  const [showQR, setShowQR] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_Public_Key;
  const CONTACTMAIL = import.meta.env.VITE_CONTACT_EMAIL;
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log("Form submitted:", templateId);
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    console.log("Form submitted:", formData);
    debugger
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
      message: formData.subject,
      to_email: CONTACTMAIL,
    };
    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Thank you! Your message has been sent.", response.status, response.text);
        // alert("已成功發送,會盡快聯繫您")
        setStatus("留言已發送！");

      })
      .catch((err) => {
        console.error("發送失敗", err);
        setStatus("發送失敗，請稍後再試");
      });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar></NavBar>
      
      <div className="bg-white p-10 md:p-8 rounded-lg shadow-md">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
          <img
            src={qrcode}
            alt="Logo"
            className="h-14 pl-4 cursor-pointer"
            onClick={() => setShowQR(true)}
          />
        </div>
        <p className="text-gray-600 mb-6">
          Have a question or want to learn more about our educational services? Send us a message and our team will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input type="text" id="firstName" name="firstName" placeholder="Mike" required value={formData.firstName} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
            <label htmlFor="Question" className="block text-sm font-medium text-gray-700 mb-1">
              Question(s)
            </label>
            <input type="text" id="subject" name="subject" placeholder="Math, English, etc." value={formData.subject} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            {/* <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Student Grade Level
            </label> */}
            {/* <select id="grade" name="grade" value={formData.grade} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Grade</option>
              <option>Kindergarten</option>
              <option>Elementary (1-6)</option>
              <option>Middle School (7-8)</option>
              <option>High School (9-12)</option>
            </select> */}
          </div>
          <div>
            {/* <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label> */}
            {/* <select id="location" name="location" value={formData.location} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Richmond</option>
              <option>Other Location</option>
            </select> */}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
            BOOK NOW
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
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
    </div>

  )

}

export default Book;