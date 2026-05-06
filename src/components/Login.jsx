import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const url = `${API_URL}/api/user/login`;
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. 發送請求到後端 API
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 這裡的 account 與 password 需對應你 useState 的變數名稱
        body: JSON.stringify({
          account: account,
          password: password
        }),
      });

      const result = await response.json();

      // 2. 判斷後端回傳結果
      if (response.ok && result.success) { // 假設後端回傳 { success: true }
        // 使用 sessionStorage 存儲登入狀態
        sessionStorage.setItem('isLoggedIn', 'true');

        // 如果後端有給 Token，建議也存起來
        if (result.token) {
          sessionStorage.setItem('adminToken', result.token);
        }

        navigate('/adminPage');
      } else {
        // 顯示後端回傳的錯誤訊息，若無則顯示預設訊息
        alert(result.message || '身分驗證失敗');
      }
    } catch (error) {
      console.error('登入時發生錯誤:', error);
      alert('系統連線異常，請稍後再試');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-center text-gray-800 mb-2">Magpie Admin</h1>
        <p className="text-center text-gray-500 mb-8">管理員登入系統</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="帳號"
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            type="password"
            placeholder="密碼"
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all">
            登入
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;