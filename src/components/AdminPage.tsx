import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  CalendarPlus,
  Megaphone, Repeat,
  LayoutGrid,
  Users, GraduationCap,
  Settings, Camera,
  FileImage
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import type { TabType } from '../types';
import MarqueeManagement from './MarqueeManagement';
import ActivityPosterManagement from './ActivityPosterManagement';
import PhotoGalleryManagement from './PhotoGalleryManagement';

import HomeImgManagement from './HomeImgManagement';
import ProgramePageManagement from './ProgramePageManagement';
import PhotoMangement from './PhotoMangement';


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const navigate = useNavigate();
  const handleLogout = () => {
    // 1. 清除登入狀態 (根據你之前的設定選擇 localStorage 或 sessionStorage)
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isLoggedIn'); // 保險起見兩者都清或清你用的那個

    // 2. 導回登入頁面
    navigate('/login', { replace: true });
  };


  const navItems = [
    { id: 'banner', label: '首頁照片管理', icon: LayoutGrid },
    { id: 'marquee', label: '跑馬燈管理', icon: Repeat },
    { id: 'program', label: 'program管理頁面', icon: GraduationCap },
    { id: 'poster', label: '活動海報管理', icon: Megaphone },
    { id: 'photo', label: '日常活動照片管理', icon: Camera },
    { id: 'photoMangement', label: '資料庫照片管理(開發中)', icon: LayoutGrid },

  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'marquee':
        return <MarqueeManagement />;
      case 'banner':
        return <HomeImgManagement />;
      case 'program':
        return <ProgramePageManagement />;
      case 'poster':
        return <ActivityPosterManagement />;
      case 'photo':
        return <PhotoGalleryManagement />;
      case 'photoMangement':
        return <PhotoMangement />;
      default:
        return (
          <div className="p-8 flex flex-col items-center justify-center h-full text-gray-400">
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4">
              <LayoutDashboard className="w-16 h-16 opacity-20" />
              <p className="text-xl font-medium">{navItems.find(i => i.id === activeTab)?.label} 內容開發中</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1c2e] text-white flex flex-col shadow-2xl z-10">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            控制台
          </h2>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">管理員</span>
              <span className="text-xs text-gray-500">admin@magpie.com</span>
            </div>
          </div>
        </div>
        {/* 登出按鈕：樣式設為輕微紅色的 icon 或文字 */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          title="登出系統"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="ml-2 text-gray-800 font-medium">登出系統</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {navItems.find(i => i.id === activeTab)?.label}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
