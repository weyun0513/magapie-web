import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
function  Activity() {
  const location = useLocation();
//   alert(location.pathname)
  const type = location.pathname;
  const [PosterLists, setPosterLists] = useState([]);
//   useEffect(() => {
//     const fetchActivity = async () => {
//       try {
//         // const res = await axios.get(`${serverAPIUrl}/api/program`,
//           {
//             params: { type } // 將 type 當作查詢參數傳入
//           }
//         );
//         setPosterLists(res.data[0]);

//       } catch (err) {
//         console.error("聯絡資料取得失敗", err);
//       }
//     };

//     fetchActivity();
//   }, []);
  const posterList = [
    {
      imageUrl: "https://scontent.fyka2-1.fna.fbcdn.net/v/t39.30808-6/565116932_122142986048891975_6891909212035942156_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JwnQd7dHyrAQ7kNvwFsIR6b&_nc_oc=AdkksCCp2wv3Pr-vKAc8bN4lD3KA_7xGTKLAbqZK_FVcZKdq5TrW4k1o6CxKKR1p5eE&_nc_zt=23&_nc_ht=scontent.fyka2-1.fna&_nc_gid=jHGTLMs6RmNSBZY7f7YvIA&oh=00_AfhNmBtqPcSpZZo9X52lKyAr2oq9L0bIOFQ4htvRwGv13Q&oe=69153F02",
      
      title: "",
      description: ""
    },
    {
      imageUrl: "https://scontent.fyka2-1.fna.fbcdn.net/v/t39.30808-6/565911195_122142986054891975_8453984445158974051_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=kb9LktULgVwQ7kNvwEvo302&_nc_oc=Adme6KNccUljhQs_UtrL2LQ6C0xZmBiSOw14uSANuZfjFqutuGSd2Ps8AwYKoufoop4&_nc_zt=23&_nc_ht=scontent.fyka2-1.fna&_nc_gid=Q2VqmWzpggX92TSp85TBrQ&oh=00_Afgh1bLf7FFEfIsMhvQ_mhlFeaPRAJyceR2y7X-xAHxjjg&oe=691539A3",

      title: "",
      description: ""
    },

  ];
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? posterList.length - 1 : prev - 1
    );
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === posterList.length - 1 ? 0 : prev + 1
    );
  };

  const currentPoster = posterList[currentIndex];

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
      {/* 圖片與文字區塊 */}
      <div className="flex flex-col items-center px-5">
        <div className="bg-white py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block  pl-full animate-marquee text-[#9C1C48] font-bold text-xl">
          歡迎參加 名額有限
        </div>
      </div>
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-screen-xl relative">
          {/* 左右箭頭 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#9C1C48] text-white px-3 py-2 rounded-l hover:bg-[#7a1739]"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#9C1C48] text-white px-3 py-2 rounded-r hover:bg-[#7a1739]"
          >
            →
          </button>

          {/* 圖片與文字 */}
          <img
            src={currentPoster.imageUrl}
            alt={currentPoster.title}
            onClick={handleImageClick}
            className="w-1/2 h-auto mx-auto rounded"
          />
          <h1 className="text-center text-[#9C1C48] mt-4 text-2xl font-bold">
            {currentPoster.title}
          </h1>
          <p className="text-center text-gray-800 mt-2">
            {currentPoster.description}
          </p>
        </div>
      </div>
      
      {/* 放大圖片的 Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleCloseZoom}
        >
          <img
            src={currentPoster.imageUrl}
            alt="Zoomed Poster"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
      {/* Tailwind 自訂動畫樣式 */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 10s linear infinite;
          }
        `}
      </style>
    </div>


  );
}

export default Activity;