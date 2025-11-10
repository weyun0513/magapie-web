import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
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
        "Looking for a safe, enriching, and inspiring space for your child after school? At Megpie Learning Center, our After School Program blends academic support with creative exploration and personal growth.",
      age: "",
      note: "Age 5–12|Weekdays 3:00–6:00PM",
      image: "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/556931975_122139693752891975_2968952387094971136_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=V2C6w9IMj9oQ7kNvwF8hXMs&_nc_oc=AdnBjwkemq19bFkN2XoTxNlqRnEfE17H_-JPS5zE2U1Cm61cVpkG9ud9sJW4wHGPpJw&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=t2zSeKz-kd0lJXLBNrQcQg&oh=00_AfhRA36q-H17UUCLb9OTq_gTWifH72lRna2s9lewWRU-YA&oe=6914F0DA",
      // link: "/programs/afterschool",
    },
    {
      title: "Academic Tutoring",
      content1:
        "One-on-one or small group classes tailored to individual needs in English, math,  and more.",
      age: "Age 5+",
      note: "Flexible|Appointment",
      image: "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/523110041_122124103574891975_3082681211877218923_n.jpg?stp=c256.0.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=50ad20&_nc_ohc=7BOBTDpeM0MQ7kNvwEHzOhz&_nc_oc=Adl1f5HnjFfI6I73B_o8js7XDAAmtT9R4iv3EnzUQ25V0HPIw597ha3Fj1RSRN5mv3I&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=H1lJgIkVGEiM7d0I5h7MZQ&oh=00_AfhQKCEr15rONZdhyRyhCXK6dNX3--jIGBaXjkzjcE2rAQ&oe=6914EE9A",
      // link: "/programs/tutoring",
    },
    {
      title: "Occasional events",
      content1:
        "We host occasional events that spark joy and create lasting memories for every child.",
      note: "Flexible | Appointment ",
      time: "",
      image: "https://scontent.fyvr2-1.fna.fbcdn.net/v/t39.30808-6/513217856_122116788002891975_8261438502072803080_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2IUTRceAsk0Q7kNvwF-_UbK&_nc_oc=AdnxdLsJKLskCYBtBdcT1C8STyECpOrYY01hY3hkYn0lonKNAp-qJvUS9w4jJ4LXA5k&_nc_zt=23&_nc_ht=scontent.fyvr2-1.fna&_nc_gid=BBfR-oqFN7JWDMWTDs_rJw&oh=00_Afhy8GGZzvRaXObZCaufEfY270gMHfq7SqxwSww765s96g&oe=6914CEA8",
      // link: "/programs/earlylearning",
    },
    {
      title: "Summer Camp",
      content1:
        "Our summer camp offers a safe, joyful space where children explore new interests, build friendships, and grow with confidence. Through hands-on activities, creative play, and guided learning, we create unforgettable experiences that inspire curiosity and lasting memories.",
      note: "Flexible|Appointment",
      time: "",
      image: "https://a1lc.ca/wp-content/uploads/2024/03/laptops.jpg?w=2048",
      // link: "/programs/onlinelearning",
    },
    {
      title: "Winter Camp",
      content1:
        "Our Winter Camp offers a cozy, enriching environment where children can learn, play, and grow during the holiday season. Through creative activities, hands-on projects, and joyful exploration, we help kids build confidence, make new friends, and create warm memories that last beyond winter.",
      note: "Flexible| Appointment",
      time: "",
      image: "https://a1lc.ca/wp-content/uploads/2024/03/laptops.jpg?w=2048",
      // link: "/programs/onlinelearning",
    },

  ];

  return (
          <div className="w-full min-h-screen bg-gray-50">
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