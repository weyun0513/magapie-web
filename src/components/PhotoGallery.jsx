import NavBar from "../components/NavBar";
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const PhotoGallery = () => {
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [isLoading, setIsLoading] = useState(true);
  // 這裡模擬從資料庫抓取回來的 JSON 格式
  const [photos, setPhotos] = useState([]);
  // 初始化資料抓取
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('PhotoGallery')) {
      fetchData('PhotoGallery');
    } else if (location.pathname.includes('ActivityGallery')) {
      fetchData('Activity');
    }
  }, [location.pathname]); // 當網址改變時，重新執行抓取

  const fetchData = (type = 'activity') => {
    setIsLoading(true);
    const endpoint = type === 'PhotoGallery' ? 'PhotoGallery' : 'Activity';
    fetch(`${API_URL}/api/${endpoint}?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) setPhotos(result.data);
      })
      .catch(err => console.error("Error:", err))
      .finally(() => setIsLoading(false));
  };


  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="min-h-screen bg-white p-8">
      <NavBar></NavBar>
      <h2 className="text-3xl mt-10 font-bold mb-8 text-center text-gray-800">活動展示</h2>

      {/* 2. 照片牆佈局：使用 columns 實現瀑布流 */}
      <div className="columns-4 sm:columns-6 lg:columns-8 gap-3 space-y-4 px-4">
        {photos.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid relative  group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
            onClick={(e) => {
                setSelectedImg(`${API_URL}${item.image}`);
            }}
          >
            <img
              src={`${API_URL}${item.image}`}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />

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