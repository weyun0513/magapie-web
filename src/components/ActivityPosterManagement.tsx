import { Plus, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import type { ImgItem } from '../types';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 

export default function PhotoGalleryManagement() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fileInputRef = useRef(null);
  
  // 狀態管理
  const [items, setItems] = useState<ImgItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 表單與上傳狀態
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 存放原始 File 物件
  const [previews, setPreviews] = useState<string[]>([]);         // 存放預覽 URL

  // 初始化資料抓取
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch(`${API_URL}/api/activity?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        if (result.ok) setItems(result.data);
      })
      .catch(err => console.error("Error:", err))
      .finally(() => setIsLoading(false));
  };

  // 處理圖片選取邏輯
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (mode === 'add') {
      // 批量模式：疊加檔案與預覽
      setSelectedFiles(prev => [...prev, ...fileArray]);
      const newUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newUrls]);
    } else {
      // 編輯模式：替換為單一檔案
      const file = fileArray[0];
      setSelectedFiles([file]);
      setPreviews([URL.createObjectURL(file)]);
    }
  };

  // 移除預覽圖片（僅限新增模式）
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]); // 釋放記憶體
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const openModal = (item: ImgItem | null = null) => {
    if (item) {
      setMode('edit');
      setEditingId(item.id);
      setPreviews([`${API_URL}${item.image}`]); // 顯示原圖
      setSelectedFiles([]); // 尚未選取新檔案
    } else {
      setMode('add');
      setEditingId(null);
      setPreviews([]);
      setSelectedFiles([]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // 關閉前釋放所有產生的 Blob URL
    if (mode === 'add') {
      previews.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    }
    setIsModalOpen(false);
  };

  const handleSave = async () => {
  // 基礎驗證
  if (mode === 'add' && selectedFiles.length === 0) {
    alert('請至少選擇一張圖片');
    return;
  }

  const formData = new FormData();
  formData.append('type', 'BottomPics'); // 確保與後端 type 一致

  try {
    let url = "";
    
    if (mode === 'add') {
      // --- 情境一：批量新增 ---
      url = `${API_URL}/api/activity/createActivityPosterBatch`; // 呼叫新的批量 API
      
      // 注意：Key 必須是 'images'，要跟後端的 uploadMultipleMiddleware 一致
      selectedFiles.forEach((file) => {
        formData.append('images', file); 
      });
      
      // 批量模式下通常會給予預設順序
      formData.append('order', '9999'); 
    } else {
      // --- 情境二：單一編輯 ---
      url = `${API_URL}/api/activity/updateActivityPoster`; // 呼叫原有的更新 API
      
      // 如果有選新檔案就傳新檔案，否則傳舊路徑
      if (selectedFiles.length > 0) {
        formData.append('image', selectedFiles[0]); // 編輯模式後端收的是 'image'
      } else {
        // 取得當前預覽圖的路徑（去掉 API_URL 部分）
        const existingPath = previews[0].replace(API_URL, "");
        formData.append('image', existingPath);
      }
      
      formData.append('id', editingId!); // 傳入要編輯的 ID[cite: 2]
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('儲存失敗');
    
    alert(mode === 'add' ? '批量新增成功' : '更新成功');
    fetchData(); // 重新整理清單
    closeModal();
  } catch (error) {
    console.error('Save error:', error);
    alert('儲存時發生錯誤');
  }
};

  const handleDelete = async (id: string) => {
    if (!window.confirm("確定要刪除嗎？")) return;
    try {
      const res = await fetch(`${API_URL}/api/activity/deleteActivityPoster/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== id));
        alert("刪除成功");
      }
    } catch (err) {
      alert("刪除失敗");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">日常照片管理</h1>
        <button 
          onClick={() => openModal(null)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" /> 批量新增
        </button>
      </div>

      {/* 資料表格清單 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">縮圖</th>
              <th className="px-6 py-4 font-semibold text-gray-600">路徑</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={`${API_URL}${item.image}`} className="w-12 h-12 rounded-lg object-cover border" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.image}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline">編輯</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">刪除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal 視窗 */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
                <h2 className="text-xl font-bold">{mode === 'add' ? '批量上傳照片' : '編輯照片'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>

              <div className="p-6 space-y-4">
                {/* 上傳觸發區 */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    multiple={mode === 'add'} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">{mode === 'add' ? '點擊或拖入多張圖片' : '點擊更換單張圖片'}</p>
                </div>

                {/* 預覽網格區 */}
                <div className="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto p-2">
                  {previews.map((url, index) => (
                    <div key={index} className="relative group aspect-video">
                      <img src={url} className="w-full h-full object-cover rounded-lg shadow-sm" />
                      {mode === 'add' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
                <button onClick={closeModal} className="flex-1 py-2 border rounded-xl hover:bg-white">取消</button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  確認儲存 {mode === 'add' && selectedFiles.length > 0 && `(${selectedFiles.length})`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}