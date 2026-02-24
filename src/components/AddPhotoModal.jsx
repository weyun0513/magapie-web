// AddPhotoModal.jsx
import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const AddPhotoModal = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null); // 儲存預覽圖 URL
    
    const fileInputRef = useRef(null); // 用來觸發隱藏的 input
    if (!isOpen) return null;
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = new URL.createObjectURL(file);
            setSelectedImage(url);
        }
    };

    // 點擊虛線框觸發 input
    const onUploadClick = () => {
        fileInputRef.current.click();
    };
    // 處理拖拽 (Drag & Drop)
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">新增照片</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

             {/* 圖片上傳區域 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">圖片</label>
          
          {/* 隱藏的檔案輸入框 */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            accept="image/*"
          />

          {/* 拖放/點擊區域 */}
          <div 
            onClick={onUploadClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all min-h-[200px] ${selectedImage ? 'border-blue-400' : ''}`}
          >
            {selectedImage ? (
              /* 預覽狀態 */
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img src={selectedImage} alt="Preview" className="max-h-[180px] rounded-lg object-contain" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              /* 初始狀態 */
              <>
                <div className="bg-slate-200 p-3 rounded-full mb-3">
                  <Upload className="text-slate-500" size={24} />
                </div>
                <p className="text-slate-600 font-medium">拖放圖片到此處</p>
                <p className="text-xs text-slate-400 mt-1">或點擊選擇檔案</p>
              </>
            )}
          </div>
        </div>

                {/* 輸入欄位 */}
                <div className="space-y-4">
                    <input type="text" placeholder="輸入照片標題" className="w-full px-4 py-3 rounded-xl border-2 border-blue-500 outline-none" />
                    <input type="text" placeholder="輸入分類名稱" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                    <button onClick={onClose} className="px-6 py-2 text-slate-500">取消</button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">儲存</button>
                </div>
            </div>
        </div>
    );
};

export default AddPhotoModal; // 