import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
export default function ProgramsPage() {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 建議增加載入狀態

  useEffect(() => {
    setIsLoading(true); // 開始抓取時確保是 true
    fetch(`${API_URL}/api/program`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          setPrograms(result.data);
        }
      })
      .catch(err => console.error("Error:", err))
      .finally(() => {
        setIsLoading(false); // 無論成功或失敗，結束載入
      });
  }, []);


  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavBar></NavBar>

      <div className="bg-white text-gray-800 px-3 py-10 max-w-6xl mx-auto space-y-12">
        {programs.map((program, index) => (
          <div
            key={program.id}
            className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
          >
            <img
              src={`${API_URL}${program.image}`}
              className="w-full md:w-1/2 h-90 object-cover  object-center"
            />
            <div className="pr-2">
              <h2 className="text-2xl font-bold text-black mb-2">
                {program.title}
              </h2>
              <p className="mb-3">{program.content}</p>
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