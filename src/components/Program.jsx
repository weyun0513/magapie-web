import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
export default function ProgramsPage() {
  const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;
  // const [programs, setPrograms] = useState([]);
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${serverUrl}/api/program`);
  //       setPrograms(res.data)
  //       console.log("API 回傳:", JSON.stringify(res.data, null, 2));
  //     } catch (err) {
  //       console.error("取得program失敗", err);
  //     }

  //   };
  //   fetchData();
  // }, []);
  // ✅ 暫時資料：未來可改為從 API 或資料庫取得
  const programs = [
    {
      title: "After School Learning",
      content1:
        "Looking for a safe, enriching, and inspiring space for your child after school? At Magpie Learning Center, our After School Program blends academic support with creative exploration and personal growth.",
      age: "",
      note: "Age 5–12|Weekdays 3:00–6:00PM",
      image: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763021015/program2_zj75i6.jpg",
      // link: "/programs/afterschool",
    },
    {
      title: "Academic Tutoring",
      content1:
        "One-on-one or small group classes tailored to individual needs in English, math,  and more.",
      age: "Age 5+",
      note: "Flexible|Appointment",
      image: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763022592/program5_gtf3oy.jpg",
      // link: "/programs/tutoring",
    },
    {
      title: "Occasional events",
      content1:
        "We host occasional events that spark joy and create lasting memories for every child.",
      note: "Flexible | Appointment ",
      time: "",
      image: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763008048/his2_nkwtbg.jpg",
      // link: "/programs/earlylearning",
    },
    {
      title: "Summer Camp",
      content1:
        "Our summer camp offers a safe, joyful space where children explore new interests, build friendships, and grow with confidence. Through hands-on activities, creative play, and guided learning, we create unforgettable experiences that inspire curiosity and lasting memories.",
      note: "Flexible|Appointment",
      time: "",
      image: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763008056/1_iochcp.png",
      // link: "/programs/onlinelearning",
    },
    {
      title: "Winter Camp",
      content1:
        "Our Winter Camp offers a cozy, enriching environment where children can learn, play, and grow during the holiday season. Through creative activities, hands-on projects, and joyful exploration, we help kids build confidence, make new friends, and create warm memories that last beyond winter.",
      note: "Flexible| Appointment",
      time: "",
      image: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763007777/winter1_r71s0n.jpg",
      // link: "/programs/onlinelearning",
    },

  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavBar></NavBar>
      {/* Hero Banner */}
      
      <div className="bg-white text-gray-800 px-3 py-10 max-w-6xl mx-auto space-y-12">



        {programs.map((program, index) => (
          <div
            key={program.title}
            className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full md:w-1/2 h-64 object-cover rounded shadow"
            />
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-black mb-2">
                {program.title}
              </h2>
              <p className="mb-3">{program.content1}</p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>{program.note}</strong>
              </p>
              {/* <Link
              to={program.link}
              className="inline-block bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              Learn More
            </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}