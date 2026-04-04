import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import type { MarqueeItem } from '../types';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface MarqueeManagementProps {
  initialItems: MarqueeItem[];
}

export default function MarqueeManagement() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      try {
          console.log(API_URL+"/api/poster");
        const response = await fetch(API_URL+"/api/poster");
        const result = await response.json();

        if (result.ok) {
          // 💡 關鍵：result.data 才是你要的陣列
            console.log(result.data);
          setItems(result.data);
        }
      } catch (error) {
        console.error("抓取資料失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [items, setItems] = useState<MarqueeItem[]>([]); // 初始值為空陣列
  const [isLoading, setIsLoading] = useState(true); // 建議增加載入狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MarqueeItem | null>(null);


  // Form State
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      const response = await fetch('http://localhost:3000/api/poster/createPoster', {
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
        // Add
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
  return (
    <div className="w-full p-6 bg-gray-50 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">走馬燈管理</h1>
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
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">標題</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={`${API_URL}${item.image}`} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" referrerPolicy="no-referrer" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(item)}   className="px-4 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">編輯</button>
                    <button className="px-4 py-1.5 text-sm border border-red-100 text-red-500 rounded-md hover:bg-red-50 transition-colors">刪除</button>
                  </div>
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

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">標題</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="請輸入標題"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
