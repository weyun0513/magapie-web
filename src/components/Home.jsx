import React, { useState } from "react";
import NavBar from "../components/NavBar";
const Home = () => {
 
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
    console.log("Form submitted:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      subject: "",
      grade: "",
      location: "Richmond",
    });
  };
const images = [
    "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/513196918_122117319416891975_5405000711803812303_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LjbxYFN5rkgQ7kNvwGS_fYl&_nc_oc=Adn7x4Z8Yf2uwjFD14Mgqn5Y5_0f4_phh62CVDwvVfbZanMYZH47UONZI30Z8jfVz1I&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=gn6hzN0aAXaxA00HBv6sbA&oh=00_AfjF1kTskFlJytrPG2akwWdsSBjNteVE_1_EnUDaG45G_g&oe=6914DDC8",
    "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/513484396_122117317598891975_4146128265184738202_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=9nWfbG3zQ68Q7kNvwEWHhm1&_nc_oc=Adl-6I3skm7G8q9Oa-hw2D_CNWsVfEhpF76dNJ2EMTpDwLkYvpAmzG7oarvLMWX5Pvs&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=Zbf0yJsFbxsEA0-2bY0bDQ&oh=00_AfiH2XqIL_tEtghbi2lzlWEOe3rfiNTiNSf-gJcrupm6Fg&oe=6914B701",
    "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/509422989_122116788776891975_2537538097118333927_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=k2HGjKxXSe0Q7kNvwEt11EP&_nc_oc=AdnrkBH-yTKMs5lZYD8doyMkvJbLljeY7DdCuPQYIDwAHnrulnMwyUNrDJRKUipRbRk&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=BbkEgXytxX-brUf7IpyjqA&oh=00_AfgkdW8uz1KoPKuXSKrfydpevaJ6n3jSn1wjJdPnff49Vw&oe=6914C063",
    "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/513277581_122117319782891975_8767172140471261846_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=I1kAOsPmPnsQ7kNvwGJfOdc&_nc_oc=Adl1hsPuNnx12pb8ONf_KvC4_98pqEPM01Dlpe3k9aGXdX8e0clkXsiea-zAwa349zo&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=3KYkXg3GD9jzgNJsoUNuVQ&oh=00_AfgFy7LlCk_OtWMb2EP9sc4PTkfdJ6-w8X5H69AlKy38pg&oe=6914C8F6"
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar></NavBar>
      {/* Hero Banner */}
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

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Megpie Learing Center</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Master the Fundamentals. Spark Creativity. Build Confidence.</strong> At Megpie Learning Center, we believe every child deserves a personalized path to success. That’s why each student receives one-on-one guidance from a dedicated tutor and a fully customized learning plan—tailored to their pace, interests, and goals.<p>在 Megpie，我們幫助孩子打好學習基礎，激發創意，建立自信。</p>

            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We don’t just teach subjects—we nurture thinkers. While building a strong academic foundation, your child will also develop essential life skills such as: <strong> Time Management, Confidence Building, Creative Thinking, Organization skills, and Team work!</strong>
            </p>

            <div className="space-y-3 text-lg">
              <p className="flex items-center gap-2">
                📍 Location: <strong>260-8360 Granville Ave, Richmond, BC, Canada</strong>
              </p>
              <p className="flex items-center gap-2">
                📞 Phone: <a href="tel:+16043180198" className="text-black hover:underline">+1 778-300-2366</a>
              </p>
              <p className="flex items-center gap-2">
                ✉️ Email: <a href="mailto:Magpielearningcentre@gmail.com" className="text-black hover:underline">
                  Magpielearningcentre@gmail.com
                </a>
              </p>
            </div>

            {/* Google Maps */}
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5218.059841522045!2d-123.13173180000001!3d49.1620403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54860ab45f700001%3A0xd3c87353b074b264!2s8360%20Granville%20Ave%20%23260%2C%20Richmond%2C%20BC%20V6Y%201N4!5e0!3m2!1szh-TW!2sca!4v1762591771507!5m2!1szh-TW!2sca"
                width="100%"
                height="300"
                style={{border:0}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
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
                  <input type="text" id="firstName" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="lastName" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input type="tel" id="phone" name="phone" placeholder="(604) 555-1234" required value={formData.phone} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
              

              <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
                BOOK NOW
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
         <div className="grid grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`photo-${index}`} className="w-full h-40 rounded shadow-md object-cover" />
      ))}
    </div>
      </div>
    </div>
  );
};

export default Home;