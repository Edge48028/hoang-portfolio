"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Code, Smartphone, Zap, CheckCircle2,
  Monitor, ShieldCheck, Clock, Users, ArrowRight,
  Terminal, Mail, Briefcase, GraduationCap, Target, Database, TrendingUp, LineChart, Heart, Star, Award
} from 'lucide-react';

// === MOCK DATA VỚI ICON ĐƯỢC TRUYỀN DƯỚI DẠNG COMPONENT ===
const statsData = [
  { IconComponent: CheckCircle2, value: '50+', label: 'DỰ ÁN HOÀN THÀNH' },
  { IconComponent: Users, value: '100%', label: 'KHÁCH HÀNG HÀI LÒNG' },
  { IconComponent: Zap, value: '24/7', label: 'HỖ TRỢ DATA & TRACKING' },
  { IconComponent: Clock, value: '3-7 NGÀY', label: 'THỜI GIAN BÀN GIAO' },
];

const servicesData = [
  { IconComponent: Target, title: 'Performance Marketing', description: 'Chiến lược & tối ưu quảng cáo chuyển đổi Meta/Google. Tập trung ROAS.' },
  { IconComponent: Database, title: 'Tracking & Analytics', description: 'Thiết lập Meta Pixel, CAPI, GA4, GTM chuẩn xác.' },
  { IconComponent: Terminal, title: 'Phân Tích Dữ Liệu', description: 'Ứng dụng tư duy Data Science/Python vào phân tích hành vi.' },
  { IconComponent: ShieldCheck, title: 'Tài Khoản & MXH', description: 'Xác minh thương hiệu (Tích xanh), seeding tương tác Ads.' }
];

// ... (Các data khác giữ nguyên như cũ)

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [targetSize, setTargetSize] = useState({ w: 40, h: 40 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const target = (e.target as HTMLElement).closest('button, a, input, .hover-target');
      if (target) {
        const rect = target.getBoundingClientRect();
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px, 0)`;
        setTargetSize({ w: rect.width + 16, h: rect.height + 16 });
        setIsHovering(true);
      } else {
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        setTargetSize({ w: 40, h: 40 });
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isVisible]);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[10000] hidden sm:block drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}>
       <div className={`absolute w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all ${isHovering ? 'scale-0' : 'scale-100'}`} />
       <div className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out" style={{ width: targetSize.w, height: targetSize.h }}>
         <div className={`w-full h-full transition-all duration-300 ${isHovering ? 'rotate-0' : 'animate-[spin_4s_linear_infinite] opacity-60'}`}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400" />
         </div>
       </div>
    </div>
  );
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white selection:bg-blue-500/30 relative overflow-hidden">
      <style>{`@media (hover: hover) and (pointer: fine) { * { cursor: none !important; } }`}</style>
      <CustomCursor />
      
      {/* Navbar & Header */}
      <nav className="fixed w-full top-0 z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-slate-800 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center overflow-hidden border border-blue-400">
             <img src="https://ui-avatars.com/api/?name=H+N&background=2563eb&color=fff" alt="Avatar" />
          </div>
          <span className="font-bold text-white tracking-tight">HOÀNG DIGITAL</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
          <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">TRANG CHỦ</button>
          <button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">DỊCH VỤ</button>
          <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">GIỚI THIỆU</button>
        </div>
        <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 px-5 py-2 rounded text-xs font-bold hover:bg-blue-700 transition-all">LIÊN HỆ</button>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        {currentPage === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-7xl font-black text-blue-400 mb-6 uppercase">Chuẩn Data</h1>
              <p className="text-slate-400 text-lg mb-10 max-w-lg">Kết hợp tư duy Data Science vào Performance Marketing để tối ưu hóa lợi nhuận thực tế.</p>
              <div className="flex gap-4">
                 <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 px-8 py-4 rounded text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)]">TƯ VẤN MIỄN PHÍ</button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-20 lg:mt-0">
              {statsData.map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg text-center hover-target">
                  <stat.IconComponent className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... (Các page About/Services khác tương tự) ... */}
        {currentPage === 'about' && <div className="text-center">Trang Giới Thiệu (Đang cập nhật nội dung từ code cũ của bạn)</div>}
      </main>

      <footer className="border-t border-slate-800 p-8 text-center text-slate-500 text-sm font-mono">
        © 2026 Hoàng Nguyễn. Setup Code & Tracking.
      </footer>
    </div>
  );
}