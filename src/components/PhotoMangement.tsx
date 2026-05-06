import React, { useState, useEffect } from 'react';

const PhotoMangement = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleDelete = async (filename:string) => {
    if (!window.confirm("確定要刪除嗎？")) return;
    try {
      const res = await fetch(`${API_URL}/api/assets/files/${filename}`, { method: 'DELETE' });
      
      if (res.ok) {
        setPhotos(prev => prev.filter(i => i.fname !== filename));
        alert("刪除成功");
      }
    } catch (err) {
      alert("刪除失敗");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    // 抓取所有照片資料
    fetch(`${API_URL}/api/assets/files?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) setPhotos(result.data);
      })
      .finally(() => setIsLoading(false));
  }, [API_URL]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">資料庫照片管理</h2>

      {isLoading ? (
        <div className="text-center py-10">載入中...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {photos.map((item) => (
            <div key={item.fname} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              {/* 圖片預覽 */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`${API_URL}${item.url}`}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>

              {/* 檔案資訊區 */}
              <div className="p-2 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                  <span className="truncate w-24">ID: {item.fname}</span>
                  <span className="bg-blue-50 text-blue-600 px-1 rounded font-mono">
                    {item.size || '未知大小'}
                  </span>
                </div>

                {/* 功能按鈕：例如刪除 */}
                <button onClick={() => handleDelete(item.fname)} className="w-full py-1 mt-2 text-xs bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors">
                  刪除檔案
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoMangement;