
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import emailjs from "@emailjs/browser";
const Book = () => {
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
      name: formData.firstName,
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
        setName("");
        setMessage("");
      })
      .catch((err) => {
        console.error("發送失敗", err);
        setStatus("發送失敗，請稍後再試");
      });
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavBar></NavBar>
      <div className="relative h-64 md:h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/500058654_122098283186891975_3994102127364412641_n.png?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=vEW5s6oIJOkQ7kNvwHQ-8y8&_nc_oc=AdkP4jfqegib2WknNfZu1SYna1fITospqpyyIqxNwKfqt55XbIGmwQrGJudaqz9ZTD8&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=cOCe5UoR8DVKOp0o8kdgeQ&oh=00_AfhqIJiVz48-1HrKl4_kv09tPi-mgmllcOzNWPVciSYLmA&oe=6914B907')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        <div className="relative  mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Richmond, BC Location</h1>
            <p className="text-white mt-2">
              <a href="/" className="hover:underline">Home</a> /
              <a href="/locations" className="hover:underline"> Locations</a> /
              Richmond, BC Location
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white   p-10 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
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
    </div>

  )
}

export default Book;