import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import type { ImgItem } from '../types';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function BannerManagement() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


  const [items, setItems] = useState<ImgItem[]>([]); // 初始值為空陣列
  const [isLoading, setIsLoading] = useState(true); // 建議增加載入狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ImgItem | null>(null);


  // Form State
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [homeData, setHomeData] = useState({ banner: [], bottomPics: [] });
  // --- 2. 衍生資料 (Derived State) ---
  // 直接從 homeData 拿資料，不需要再寫 .filter，因為後端已經分好類了！
  const fixedBanners = Array.from({ length: 2 }, (_, i) => homeData.banner[i] || null);
  const fixedBottoms = Array.from({ length: 4 }, (_, i) => homeData.bottomPics[i] || null);;
  useEffect(() => {
    setIsLoading(true); // 開始抓取時確保是 true
    fetch(`${API_URL}/api/home/getHomeImgManagment?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) {
          setHomeData(result.data);
        }
      })
      .catch(err => console.error("Error:", err))
      .finally(() => {
        setIsLoading(false); // 無論成功或失敗，結束載入
      });
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    if (!title || (!image && !selectedFile)) {
      alert('請填寫標題並上傳圖片');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    if (editingItem) {
      formData.append('id', editingItem.id);
      formData.append('image', editingItem.image);
    }

    try {

     const url = editingItem
        ? API_URL+"/api/poster/updateMarquee"
        : API_URL+"/api/poster/createMarquee";


      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const savedItem: MarqueeItem = await response.json();

      if (editingItem) {
        // Update
        setItems(items.map(item =>
          item.id === editingItem.id ? savedItem : item
        ));
      } else {
        setItems([...items, savedItem]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving marquee:', error);
      alert('儲存失敗，請稍後再試');
    }
  };
  const openModal = (item: MarqueeItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setImage(`${API_URL}${item.image}`);
      setSelectedFile(null);
    } else {
      setEditingItem(null);
      setTitle('');
      setImage('');
      setSelectedFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTitle('');
    setImage('');
    setSelectedFile(null);
  };

  const handleDelete = async (id: string) => {
    // 1. 跳出瀏覽器原生確認視窗
    const isConfirmed = window.confirm("確定要刪除這筆資料嗎？");

    if (!isConfirmed) return; // 如果使用者取消，就中斷執行

    try {
      // 2. 發送刪除請求
      const response = await fetch('http://localhost:3000/api/poster/deletePoster', {
        method: 'DELETE', // 或是用 DELETE，但需確保後端路由對應
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }), // 傳送 id 給後端
      });

      if (!response.ok) {
        throw new Error('刪除失敗');
      }

      // 3. 更新前端 UI (從列表中移除該項目)
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      alert("刪除成功！");

    } catch (error) {
      console.error("Error deleting item:", error);
      alert("刪除時發生錯誤");
    }
  };
  return (
    <div className="w-full p-6 bg-gray-50 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Banner管理</h1>
        <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md">
          <Plus className="w-5 h-5" />
          新增
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">縮圖</th>
            </tr>
          </thead>
          <tbody>
            {fixedBanners.map((item, index) => (
              <tr key={item?.id || `empty-banner-${index}`} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {item ? (
                    <img src={`${API_URL}${item.image}`} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">空位</div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item ? item.title : <span className="text-gray-400 italic">尚未設定 {index + 1}</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {item ? (
                      <>
                        <button onClick={() => openModal(item)} className="...">編輯</button>
                        <button onClick={() => handleDelete(item.id)} className="...">刪除</button>
                      </>
                    ) : (
                      <button onClick={() => openModal({ type: 'Marquee' })} className="text-blue-600 hover:underline text-sm">新增資料</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">底圖管理</h1>

      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">縮圖</th>
            </tr>
          </thead>
          <tbody>
            {fixedBottoms.map((item, index) => (
              <tr key={item?.id || `empty-banner-${index}`} className="...">
                <td className="px-6 py-4">



                  {item ? (
                    <img src={`${API_URL}${item.image}`} alt={item?.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">空位</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {/* 使用可選鏈 item?.title 解決報錯 */}
                  {item ? item.title : <span className="text-gray-400">尚未設定 {index + 1}</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  {item ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(item)}>編輯</button>
                      <button onClick={() => handleDelete(item.id)}>刪除</button>
                    </div>
                  ) : (
                    <button onClick={() => openModal({ type: 'ButtonImg' })} className="text-blue-600">新增</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingItem ? '編輯走馬燈' : '新增走馬燈'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">上傳圖片</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl aspect-video flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all overflow-hidden"
                  >
                    {image ? (
                      <>
                        <img src={image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <ImageIcon className="w-10 h-10" />
                        <span className="text-sm">點擊上傳圖片</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>




              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20"
                >
                  儲存
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
