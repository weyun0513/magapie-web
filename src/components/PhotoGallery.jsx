import React, { useState } from 'react';
import NavBar from "../components/NavBar";
const PhotoGallery = () => {
  // 1. 使用 Hard Code 預填資料
  // 這裡模擬從資料庫抓取回來的 JSON 格式
  const [photos, setPhotos] = useState([
    {
      id: 1,
      type: "image",
      url: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770714104/poster2_in1hy8.jpg",
      title: "活動海報 1"
    },
    {
      id: 2,
      type: "image",
      url: "https://picsum.photos/800/1200?random=1",
      title: "精彩瞬間"
    },
    {
      id: 3,
      type: "image",
      url: "https://picsum.photos/800/600?random=2",
      title: "風景攝影"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://picsum.photos/800/1000?random=3",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770109031/his8_dxhiug.jpg",
      title: "人像專題"
    },
    {
      id: 4,
      type: "image",
      url: "https://res.cloudinary.com/dux3mbryw/image/upload/v1770109167/his9jpg_sx2xh8.jpg",
      title: "人像專題"
    }
  ]);

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="min-h-screen bg-white p-8">
         <NavBar></NavBar>
      <h2 className="text-3xl mt-10 font-bold mb-8 text-center text-gray-800">活動展示</h2>

      {/* 2. 照片牆佈局：使用 columns 實現瀑布流 */}
      <div className="columns-3 sm:columns-4 lg:columns-4 gap-4 space-y-4">
        {photos.map((item) => (
          <div 
            key={item.id} 
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
            onClick={(e) => {
              // 你的核心邏輯：判斷 type 是否為 image
              if (item.type === "image") {
                setSelectedImg(item.url);
              }
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* 懸停遮罩 */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                點擊放大
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 放大預覽 Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-5xl w-full flex justify-center">
            <img 
              src={selectedImg} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
            <button className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-400">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;