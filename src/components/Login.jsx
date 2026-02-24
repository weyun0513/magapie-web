import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (account === 'admin' && password === '1234') {
      navigate('/admin');
    } else {
      alert('帳號或密碼錯誤');
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