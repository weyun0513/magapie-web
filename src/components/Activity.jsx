import React, { useState, useMemo } from "react";
import axios from "axios";
import banner from '../assets/logobanner.png';
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
function Activity() {
  const location = useLocation();
  // alert(location.pathname)
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
  const posterList = useMemo(() => {
    if (type.includes("PastActivities")) {
      return [
        {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770109167/his9jpg_sx2xh8.jpg",

        title: "",
        description: ""
      },
        {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770109031/his8_dxhiug.jpg",

        title: "",
        description: ""
      },{
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763008048/his2_nkwtbg.jpg",

        title: "",
        description: ""
      },
      {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763008063/his1_c2w7pl.jpg",
        title: "",
        description: ""
      },
      {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763009612/his3_uumu4m.jpg",
        title: "",
        description: ""
      }, {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763009657/his5_u3kc6v.jpg",
        title: "",
        description: ""
      }, {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763008035/3_zzlneb.png",
        title: "",
        description: ""
      }, {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763020820/his7_bt8wns.jpg",
        title: "",
        description: ""
      }, {
        imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763020888/his6_k77ttd.jpg",
        title: "",
        description: ""
      }]; // 歷史活動資料
    }
    return [{
      imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763007777/winter2_yqmrna.jpg",
      title: "",
      description: ""
    },
    {
      imageUrl: "https://res.cloudinary.com/dux3mbryw/image/upload/v1763007777/winter1_r71s0n.jpg",

      title: "",
      description: ""
    }]; // 預設活動資料
  }, [type]);



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
      <div className="relative h-64 md:h-40 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>

        <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        <div className="relative  mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Richmond, BC Location</h1>

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