'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import adminData from '@/data/admins.json';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const admin = adminData.admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      localStorage.setItem('userRole', 'admin');
      router.push('/admin/dashboard');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleStudentLogin = () => {
    localStorage.setItem('userRole', 'student');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1a1a2e]">ورود به سیستم</h1>
          
          {/* فرم ورود ادمین */}
          <form onSubmit={handleAdminLogin} className="mb-8">
            <div className="mb-4">
              <label className="block text-[#2d3436] font-bold mb-2">نام کاربری</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="نام کاربری را وارد کنید"
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#2d3436] font-bold mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#06beb6] focus:outline-none focus:border-[#48b1f3]"
                placeholder="رمز عبور را وارد کنید"
              />
            </div>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              ورود ادمین
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#636e72]">یا</span>
            </div>
          </div>

          {/* دکمه ورود دانشجو */}
          <button
            onClick={handleStudentLogin}
            className="mt-8 btn-primary w-full bg-gradient-to-l from-[#48b1f3] to-[#06beb6]"
          >
            ورود دانشجو
          </button>
        </div>
      </div>
    </div>
  );
} 