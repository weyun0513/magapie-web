import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import type { ProgramItem } from '../types';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function ProgramePageManagement() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(API_URL + "/api/program/");
        const result = await response.json();

        if (result.ok) {

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

  const [items, setItems] = useState<ProgramItem[]>([]); // 初始值為空陣列
  const [isLoading, setIsLoading] = useState(true); // 載入狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramItem | null>(null);


  // Form State
  const [order, setOrder] = useState<number>(9999);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
    if ((!image && !selectedFile)) {
      alert('請填寫標題並上傳圖片');
      return;
    }

     if (!order) {
      alert('請填寫順序');
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      // 情境 A：使用者有選擇新檔案（無論是新增還是編輯）
      formData.append('image', selectedFile);
    } else if (editingItem && editingItem.image) {
      // 情境 B：在編輯模式，且使用者「沒有」選擇新檔案
      formData.append('image', editingItem.image);
    }
    if (editingItem) {
      formData.append('id', editingItem.id);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('order', String(order));
    } else {
      formData.append('title', title);
      formData.append('content', content);
      formData.append('order', String(order));
    }

    try {

      const url = editingItem
        ? API_URL + "/api/program/updateProgram"
        : API_URL + "/api/program/createProgram";


      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json(); // 先拿到整包 JSON
      const savedItem = result.data;
      if (editingItem) {

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
  const openModal = (item: ProgramItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setContent(item.content);
      setOrder(item?.order);

      setImage(`${API_URL}${item.image}`);
      setSelectedFile(null);
    } else {
      setEditingItem(null);
      setContent('');
      setTitle('');
      setImage('');
      setOrder('');
      setSelectedFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTitle('');
    setContent('');
    setImage('');
    setSelectedFile(null);
  };

  const handleDelete = async (item: ProgramItem) => {
    const isConfirmed = window.confirm("確定要刪除這筆資料嗎？");
    if (!isConfirmed) return; // 如果使用者取消，就中斷執行

    try {
      // 2. 發送刪除請求
      const response = await fetch(`${API_URL}/api/program/deleteProgram/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('刪除失敗');
      }

      setItems(prevItems => prevItems.filter(i => i.id !== item.id));
      alert("刪除成功！");

    } catch (error) {
      console.error("Error deleting item:", error);
      alert("刪除時發生錯誤");
    }
  };
  return (
    <div className="w-full p-6 bg-gray-50 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Program內容管理</h1>
        <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md">
          <Plus className="w-5 h-5" />
          新增
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">排序</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">縮圖</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">標題</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">內文</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{item.order}</td>
                <td className="px-6 py-4">
                  <img src={`${API_URL}${item.image}`} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" referrerPolicy="no-referrer" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                <td className="px-6 py-4 font-medium text-gray-800 max-w-xs line-clamp-2">{item.content}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(item)} className="px-4 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">編輯</button>
                    <button onClick={() => handleDelete(item)} className="px-4 py-1.5 text-sm border border-red-100 text-red-500 rounded-md hover:bg-red-50 transition-colors">刪除</button>
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl 
             max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingItem ? '編輯' : '新增'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto flex-grow custom-scrollbar">
                {/* 這裡放你的上傳圖片、標題、內文等所有欄位 */}
                <div className="space-y-4">
                  <div className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">上傳圖片</label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl w-64 aspect-square mx-auto flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all overflow-hidden"
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
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">順序-越小越前面</label>
                      <input
                        type="text"
                        value={order}
                        onChange={(e) => {
                          // 解決紅線：將字串轉為數字
                          const val = e.target.value;
                          setOrder(val === "" ? 0 : Number(val));
                        }}
                        placeholder="請輸入順序"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />

                    </div>
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
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">內文</label>
                      <textarea
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="請輸入課程說明"
                        className="w-full px-4 py-2.5 min-h-[150px] resize-y bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                  </div>
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
