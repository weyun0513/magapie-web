import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, Settings, Users, Plus, Trash2, Edit } from 'lucide-react'; // 建議安裝 lucide-react
import AddPhotoModal from './AddPhotoModal'; //  
const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 模擬從資料庫抓取的 JSON 資料
  const [photos, setPhotos] = useState([
    { id: 1, title: "活動海報", category: "自然", url: "https://picsum.photos/100", type: "image" },
    { id: 2, title: "城市街拍", category: "建築", url: "https://picsum.photos/101", type: "image" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100 w-full"> {/* 確保最外層撐滿寬度 */}
      {/* 1. 左側導覽列 Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-slate-800 text-blue-400">
          控制台
        </div>
        <nav className="p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-600 rounded-lg"><LayoutDashboard size={20} /> 總覽</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><ImageIcon size={20} /> 跑馬燈管理</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><ImageIcon size={20} /> 新活動管理</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><ImageIcon size={20} /> 活動歷史管理</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><ImageIcon size={20} /> 活動牆管理</button>

          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><Users size={20} /> 用戶管理</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><Settings size={20} /> 系統設定</button>
        </nav>
      </aside>

      {/* 2. 右側主內容區 */}
      {/* 2. 右側主內容區 (關鍵：flex-1 讓它佔滿剩餘空間) */}
      <main className="flex-1 flex flex-col min-w-0"> {/* min-w-0 防止內容溢出時撐破佈局 */}
        
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 w-full">
          <h2 className="text-xl font-semibold text-gray-700">跑馬燈管理系統</h2>
        </header>

        {/* 內容區：確保這裡的 w-full */}
        <section className="p-8 w-full max-w-[1600px] mx-auto"> 
          <div className="flex justify-between items-center mb-6 w-full">
            <h3 className="text-lg font-bold text-gray-800">全部照片</h3>
            <button onClick={() => setIsModalOpen(true)} // 2. 點擊開啟
        className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ 新增照片</button>
          </div>

          {/* 表格容器：必須加 w-full */}
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto w-full">
            <table className="w-full text-left border-collapse"> {/* 這裡的 w-full 很重要 */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">縮圖</th>
                  <th className="p-4">標題</th>
                  <th className="p-4">分類</th>
                  <th className="p-4 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {/* ...Map 資料... */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <AddPhotoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AdminPage;