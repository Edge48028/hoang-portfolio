"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Code, Smartphone, Zap, CheckCircle2,
  Monitor, ShieldCheck, Clock, Users, ArrowRight,
  Terminal, Mail, Briefcase, GraduationCap, Target, Database, TrendingUp, LineChart, Heart, Star, Award
} from 'lucide-react';

// ==========================================
// 1. MOCK DATA
// ==========================================

const statsData = [
  { Icon: CheckCircle2, value: '50+', label: 'DỰ ÁN HOÀN THÀNH' },
  { Icon: Users, value: '100%', label: 'KHÁCH HÀNG HÀI LÒNG' },
  { Icon: Zap, value: '24/7', label: 'HỖ TRỢ DATA & TRACKING' },
  { Icon: Clock, value: '3-7 NGÀY', label: 'THỜI GIAN BÀN GIAO' },
];

const servicesData = [
  {
    Icon: Target,
    title: 'Performance Marketing',
    description: 'Chiến lược & tối ưu quảng cáo chuyển đổi Meta/Google. Tập trung ROAS, giảm CPL/CPA.',
  },
  {
    Icon: Database,
    title: 'Tracking & Analytics',
    description: 'Thiết lập Meta Pixel, CAPI, GA4, GTM chuẩn xác để không sót data chuyển đổi.',
  },
  {
    Icon: Terminal,
    title: 'Phân Tích Dữ Liệu (Data)',
    description: 'Ứng dụng tư duy Data Science/Python vào phân tích hành vi, dự đoán xu hướng scale.',
  },
  {
    Icon: ShieldCheck,
    title: 'Tài Khoản & MXH',
    description: 'Xác minh thương hiệu (Tích xanh), seeding tương tác và cấp tài nguyên Ads ổn định.',
  }
];

const skillsCategories = [
  {
    title: "Performance Marketing",
    Icon: Target,
    items: [
      { name: "Meta Ads (Facebook/IG)", percent: 95 },
      { name: "Google Ads (Search/PMax)", percent: 90 },
      { name: "Tiktok Ads", percent: 85 },
      { name: "A/B Testing & Funnel", percent: 92 },
    ]
  },
  {
    title: "Data & Analytics",
    Icon: LineChart,
    items: [
      { name: "Google Analytics 4 (GA4)", percent: 95 },
      { name: "Python / Pandas / Numpy", percent: 85 },
      { name: "SQL (Data Query)", percent: 80 },
      { name: "Looker Studio (Dashboards)", percent: 90 },
    ]
  },
  {
    title: "Tracking & Technical",
    Icon: Code,
    items: [
      { name: "Google Tag Manager (GTM)", percent: 95 },
      { name: "Meta Conversions API (CAPI)", percent: 90 },
      { name: "HTML5 / CSS3 / JS", percent: 85 },
      { name: "ASP.NET Core / API", percent: 80 },
    ]
  },
  {
    title: "Tools & Design",
    Icon: Monitor,
    items: [
      { name: "Excel / Spreadsheets", percent: 95 },
      { name: "Figma (Landing Page UI)", percent: 75 },
      { name: "Git / GitHub", percent: 85 },
      { name: "CRM & Automation", percent: 80 },
    ]
  }
];

const techStack = [
  "Meta Ads", "Google Ads", "GA4", "Google Tag Manager", "Python", "SQL", "ASP.NET Core", "C#", "Conversions API", "Looker Studio", "Excel", "GitHub", "Figma", "REST API", "Postman", "Zapier"
];

const timelineData = [
  {
    year: "2024",
    status: "HIỆN TẠI",
    title: "Phát Triển API & Data Analytics",
    desc: "Làm Back-end Developer tại BAKCO SOLUTIONS. Tốt nghiệp Cử nhân Khoa học Dữ liệu (Data Scientist) tại Đại học Nguyễn Tất Thành.",
    icon: "🚀"
  },
  {
    year: "2023",
    status: "",
    title: "Digital Marketing Specialist",
    desc: "Chạy chiến dịch tại Pathlab Việt Nam, Yamaha Music School và FPT Telecom. Quản lý ngân sách lớn, tối ưu CPL và tỷ lệ chuyển đổi Lead.",
    icon: "💼"
  },
  {
    year: "2020",
    status: "",
    title: "Chuyển Hướng Công Nghệ Dữ Liệu",
    desc: "Bắt đầu học chuyên ngành Khoa học dữ liệu để nâng cao tư duy số học, bổ trợ trực tiếp cho các chiến lược Performance Marketing.",
    icon: "💻"
  },
  {
    year: "2019",
    status: "",
    title: "Khởi Đầu Hành Trình Freelance",
    desc: "Nhận các dự án Social Media Marketing, setup phòng marketing thuê ngoài, tối ưu quảng cáo Meta & Google cho đa dạng ngành nghề.",
    icon: "🌱"
  },
  {
    year: "2017",
    status: "",
    title: "Bước Vào Môi Trường Đại Học",
    desc: "Học Kỹ sư Nông nghiệp tại Đại học Sài Gòn. Môi trường giúp hình thành tư duy hệ thống, phân tích logic và nền tảng kỹ thuật.",
    icon: "🏫"
  }
];

const certificatesData = [
  { title: "Cử nhân CNTT (Data Scientist)", source: "Đại học Nguyễn Tất Thành", year: "2020 - 2024" },
  { title: "Kỹ sư Nông nghiệp", source: "Đại học Sài Gòn", year: "2017 - 2020" },
  { title: "Google Ads Search Certification", source: "Google Skillshop", year: "2023" },
  { title: "Advanced Google Analytics 4", source: "Google Skillshop", year: "2023" }
];

// ==========================================
// 2. SHARED COMPONENTS & EFFECTS
// ==========================================

const TypeWriter = ({ words, pause = 2000 }: { words: string[], pause?: number }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 30 : 60); 
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, pause]);

  return (
    <span className="inline-block">
      {text}
      <span className="animate-pulse border-r-2 border-blue-400 ml-1 text-transparent">|</span>
    </span>
  );
};

// Chuột Radar từ tính (Bắt nét Target)
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [targetSize, setTargetSize] = useState({ w: 40, h: 40 }); // Default size

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Tìm kiếm các phần tử tương tác hoặc có class hover-target
      const target = (e.target as HTMLElement).closest('button, a, input, textarea, select, [role="button"], .hover-target');
      
      if (target) {
        const rect = target.getBoundingClientRect();
        // "Từ tính": Khóa chặt vị trí chuột visual vào chính giữa phần tử
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px, 0)`;
        }
        // Thay đổi kích cỡ khung ngắm để bao bọc vừa vặn phần tử (thêm padding 16px)
        setTargetSize({ w: rect.width + 16, h: rect.height + 16 });
        setIsHovering(true);
      } else {
        // Bám sát chuột thông thường
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        // Kích cỡ nhỏ lại khi đi lang thang
        setTargetSize({ w: 40, h: 40 });
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden sm:block drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}
    >
       {/* Chấm tròn Center */}
       <div 
          className={`absolute w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
            isHovering ? 'scale-0' : 'scale-100'
          } ${isClicking ? 'scale-50' : ''}`} 
       />
       
       {/* Trục thay đổi kích cỡ linh hoạt */}
       <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{ width: targetSize.w, height: targetSize.h }}
       >
         {/* Trục xoay: Bình thường xoay liên tục, khi Focus thì đứng yên ở góc 0 độ để viền khung */}
         <div className={`w-full h-full transition-all duration-300 ${isHovering ? 'rotate-0 opacity-100' : 'animate-[spin_4s_linear_infinite] opacity-60'} ${isClicking ? 'scale-95' : 'scale-100'}`}>
            
            {/* 4 Góc Brackets */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-blue-400'}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-blue-400'}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-blue-400'}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isHovering ? 'border-cyan-400' : 'border-blue-400'}`} />
         
         </div>
       </div>
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', onClick, type = "button" }: any) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded text-sm tracking-wide";
  const variants = {
    primary: "bg-[#1e40af] hover:bg-[#2563eb] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] border border-[#3b82f6]",
    outline: "bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-slate-800/50",
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ subtitle, title }: any) => (
  <div className="mb-12 text-center md:text-left">
    <div className="inline-block px-3 py-1 mb-4 bg-blue-900/30 border border-blue-500/30 text-blue-400 font-mono text-xs rounded-sm uppercase">
      {`>_ ${subtitle}`}
    </div>
    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{title}</h2>
  </div>
);

// ==========================================
// 3. LAYOUT COMPONENTS
// ==========================================

const Navbar = ({ currentPage, setCurrentPage }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'TRANG CHỦ', id: 'home' },
    { name: 'DỊCH VỤ', id: 'services' },
    { name: 'GIỚI THIỆU', id: 'about' } // Xóa Case Study
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center overflow-hidden border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all">
            <img src="https://ui-avatars.com/api/?name=Hoang+Nguyen&background=2563eb&color=fff&size=128" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none tracking-wide">HOÀNG DIGITAL</h1>
            <p className="text-blue-400 text-[10px] tracking-widest uppercase mt-1">Data & Marketing</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`text-sm font-semibold tracking-wider transition-colors hover-target px-2 py-1 ${currentPage === link.id ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="primary" onClick={() => setCurrentPage('contact')} className="!py-2.5 !px-5 flex items-center gap-2">
            <Zap className="w-4 h-4" /> LIÊN HỆ
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0f1524] border-b border-slate-800 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setCurrentPage(link.id); setMobileMenuOpen(false); }}
              className={`text-left text-sm font-semibold tracking-wider py-3 border-b border-slate-800 ${currentPage === link.id ? 'text-blue-500' : 'text-slate-300'}`}
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="w-full mt-2">
            LIÊN HỆ
          </Button>
        </div>
      )}
    </nav>
  );
};

// ==========================================
// 4. PAGE COMPONENTS
// ==========================================

const HomePage = ({ setCurrentPage }: any) => (
  <main className="w-full relative pt-28 pb-20">
    
    {/* HERO SECTION */}
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <div className="inline-flex bg-blue-600/10 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-sm font-mono text-xs mb-6 uppercase tracking-wider items-center gap-2">
            <Terminal className="w-3 h-3" />
            FREELANCE PERFORMANCE MARKETING & DATA
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 tracking-tighter mb-4 leading-none">
            CHUẨN DATA
          </h1>
          
          <div className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed h-20">
            <TypeWriter words={[
              "Kết hợp tư duy Data Science vào Digital Marketing.",
              "Xây dựng hệ thống phễu chuyển đổi, loại bỏ data rác hiệu quả.",
              "Chiến lược Tracking chuẩn xác, Scale doanh thu qua Meta & Google Ads."
            ]} />
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 border border-slate-700 bg-slate-800/40 px-4 py-2 rounded text-xs font-semibold text-slate-300 uppercase tracking-wider hover-target cursor-default">
              <Code className="w-4 h-4 text-blue-500" /> TRACKING CHUẨN XÁC
            </div>
            <div className="flex items-center gap-2 border border-slate-700 bg-slate-800/40 px-4 py-2 rounded text-xs font-semibold text-slate-300 uppercase tracking-wider hover-target cursor-default">
              <Smartphone className="w-4 h-4 text-blue-500" /> TỐI ƯU CPL/CPA
            </div>
            <div className="flex items-center gap-2 border border-slate-700 bg-slate-800/40 px-4 py-2 rounded text-xs font-semibold text-slate-300 uppercase tracking-wider hover-target cursor-default">
              <Zap className="w-4 h-4 text-blue-500" /> SCALE MẠNH MẼ
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setCurrentPage('contact')} className="flex items-center gap-2 uppercase tracking-widest text-xs py-4 px-8">
              Nhận tư vấn miễn phí <Zap className="w-4 h-4" />
            </Button>
            <Button onClick={() => setCurrentPage('services')} variant="outline" className="flex items-center gap-2 uppercase tracking-widest text-xs py-4 px-8">
              Xem dịch vụ <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-8 font-mono text-xs text-slate-500">
            <span className="flex items-center gap-2"><span className="text-blue-500">{'>'}</span> Zalo: 0986403720</span>
            <span className="flex items-center gap-2"><span className="text-blue-500">{'>'}</span> Hỗ trợ chiến lược</span>
          </div>
        </div>

        {/* Right Content - Mock Code Editor */}
        <div className="relative hidden lg:block h-[500px] hover-target">
          {/* Main Editor Window */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] bg-[#0d1117] border border-slate-800 rounded-lg shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden z-10 font-mono text-sm">
            <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-slate-500 text-xs">hoangnguyen_profile.json</div>
              <div></div>
            </div>
            <div className="p-6 text-slate-300 leading-relaxed overflow-x-auto">
              <div><span className="text-pink-500">const</span> <span className="text-blue-400">MarketerData</span> <span className="text-pink-500">=</span> {'{'}</div>
              <div className="pl-6"><span className="text-blue-300">"name"</span>: <span className="text-green-400">"Nguyễn Minh Hoàng"</span>,</div>
              <div className="pl-6"><span className="text-blue-300">"role"</span>: <span className="text-green-400">"Performance Marketer & Data Analyst"</span>,</div>
              <div className="pl-6"><span className="text-blue-300">"skills"</span>: [</div>
              <div className="pl-12 text-green-400">"Meta Ads", "Google Ads", "GA4",</div>
              <div className="pl-12 text-green-400">"GTM", "Python", "Data Science"</div>
              <div className="pl-6">],</div>
              <div className="pl-6"><span className="text-blue-300">"philosophy"</span>: <span className="text-green-400">"Data-Driven Decisions"</span>,</div>
              <div className="pl-6"><span className="text-blue-300">"contact"</span>: {'{'}</div>
              <div className="pl-12"><span className="text-blue-300">"zalo"</span>: <span className="text-orange-300">"0986403720"</span>,</div>
              <div className="pl-12"><span className="text-blue-300">"email"</span>: <span className="text-orange-300">"hoang.ads.digital@gmail.com"</span></div>
              <div className="pl-6">{'}'}</div>
              <div>{'};'}</div>
              <div className="mt-4 text-slate-500">{'// Ready to scale your revenue.'}</div>
            </div>
          </div>

          {/* Floating Mobile Wireframe */}
          <div className="absolute right-[-20px] bottom-[20px] w-[140px] h-[280px] bg-[#0d1117] border border-slate-700 rounded-2xl shadow-2xl z-20 flex flex-col p-2">
            <div className="w-1/3 h-1 bg-slate-700 mx-auto rounded-full mb-3 mt-1"></div>
            <div className="flex-1 border border-slate-800 rounded p-2 overflow-hidden flex flex-col gap-2">
               <div className="h-12 bg-blue-900/30 rounded w-full border border-blue-500/20"></div>
               <div className="h-4 bg-slate-800 rounded w-3/4"></div>
               <div className="h-4 bg-slate-800 rounded w-1/2"></div>
               <div className="h-16 bg-slate-800/50 rounded w-full mt-auto"></div>
            </div>
          </div>

          {/* Floating Status Badge */}
          <div className="absolute right-[450px] top-[40px] bg-[#0f1524] border border-slate-700 p-4 rounded-lg shadow-xl z-20 w-48 font-mono text-xs">
             <div className="flex items-center gap-2 text-green-400 mb-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> System Online
             </div>
             <div className="text-slate-400">ROAS: <span className="text-blue-400">Optimized</span></div>
             <div className="text-slate-400">Tracking: <span className="text-blue-400">100%</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* STATS SECTION */}
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => {
          const Icon = stat.Icon;
          return (
            <div key={idx} className="bg-[#111827]/80 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 transition-colors rounded-lg p-8 flex flex-col items-center justify-center text-center group hover-target cursor-default">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-blue-500 mb-3" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>

  </main>
);

const AboutPage = ({ setCurrentPage }: any) => (
  <main className="w-full pt-28 pb-24">
    
    {/* SECTION: INTRO KHÁI QUÁT CÓ HÌNH ẢNH */}
    <div className="max-w-[1200px] mx-auto px-4 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       {/* Trái: Thông tin Intro */}
       <div>
         <div className="inline-block px-3 py-1 mb-6 bg-blue-900/30 border border-blue-500/30 text-blue-400 font-mono text-xs rounded-sm uppercase tracking-widest">
           {`>_ GIỚI THIỆU`}
         </div>
         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
           XIN CHÀO, TÔI LÀ <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">PERFORMANCE<br/>MARKETER_</span>
         </h1>
         <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
           <strong className="text-white">Data & Performance Marketer</strong> chuyên nghiệp với nền tảng khoa học dữ liệu.
           <br/><br/>
           <span className="text-blue-500">{'>'}</span> Tôi tin rằng mỗi chỉ số là một câu chuyện kinh doanh riêng, và sứ mệnh của tôi là tối ưu hóa từng đồng ngân sách của bạn thành lợi nhuận thực tế một cách chuyên nghiệp nhất.
         </p>
         <div className="flex flex-col sm:flex-row gap-4">
           <Button onClick={() => setCurrentPage('contact')} className="flex items-center gap-2 uppercase tracking-widest text-xs py-4 px-8">
             <Zap className="w-4 h-4" /> Liên hệ ngay
           </Button>
           <Button onClick={() => setCurrentPage('services')} variant="outline" className="flex items-center gap-2 uppercase tracking-widest text-xs py-4 px-8">
             Xem dịch vụ <ArrowRight className="w-4 h-4" />
           </Button>
         </div>
       </div>

       {/* Phải: Khung Hình Ảnh */}
       <div className="relative max-w-md mx-auto lg:ml-auto w-full hover-target cursor-default group">
          {/* Decorative Corners (Ngoài cùng) */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-slate-500 group-hover:border-blue-400 transition-colors duration-500"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-slate-500 group-hover:border-blue-400 transition-colors duration-500"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-slate-500 group-hover:border-blue-400 transition-colors duration-500"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-slate-500 group-hover:border-blue-400 transition-colors duration-500"></div>
          
          <div className="relative border-2 border-blue-500 p-2 bg-[#0a0f1c] shadow-[0_0_30px_rgba(37,99,235,0.15)] group-hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-shadow duration-500">
             
             {/* ======================================================== */}
             {/* CHÚ Ý: BẠN HÃY THAY LINK ẢNH CHÂN DUNG CỦA BẠN VÀO `src` DƯỚI ĐÂY */}
             {/* Ví dụ: src="/images/hoang-avatar.jpg" hoặc URL ảnh thật của bạn */}
             {/* ======================================================== */}
             <img 
               src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
               alt="Hoàng Nguyễn Portrait" 
               className="w-full aspect-[4/5] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
             />
             
             {/* Tags Nhỏ Bám Quanh Viền */}
             <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 flex items-center gap-1 shadow-lg font-mono tracking-wider">
               <ShieldCheck className="w-3 h-3" /> VERIFIED
             </div>
             <div className="absolute bottom-0 left-0 -mb-3 -ml-3 bg-[#1e293b] border border-slate-600 text-slate-300 text-[10px] font-bold px-3 py-1 flex items-center gap-1 shadow-lg font-mono tracking-wider group-hover:text-white group-hover:border-slate-400 transition-colors">
               <Heart className="w-3 h-3 text-red-500" /> 100% QUALITY
             </div>
          </div>
       </div>
    </div>

    {/* SECTION: KỸ NĂNG */}
    <section className="max-w-[1200px] mx-auto px-4 mb-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Chuyên Môn & Công Nghệ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsCategories.map((cat, idx) => {
          const Icon = cat.Icon;
          return (
            <div key={idx} className="bg-[#111827] border border-slate-800 rounded-xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 group hover-target">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-slate-800 p-2.5 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>
              <div className="space-y-6">
                {cat.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-mono mb-2.5">
                      <span className="text-slate-300 font-semibold">{item.name}</span>
                      <span className="text-blue-400">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full relative" style={{ width: `${item.percent}%` }}>
                        <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-sm"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* SECTION: TECH STACK VÀ ĐIỂM NHẤN */}
    <section className="max-w-[1200px] mx-auto px-4 mb-32">
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-8 mb-8 flex flex-wrap justify-center gap-3 md:gap-4 shadow-xl hover-target cursor-default">
         {techStack.map(tech => (
           <div key={tech} className="flex items-center gap-2 bg-[#1e293b]/60 border border-slate-700 px-4 py-2 rounded-md text-sm text-slate-300 transition-all cursor-default shadow-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
             <span className="font-mono tracking-tight">{tech}</span>
           </div>
         ))}
      </div>

      <div className="bg-gradient-to-r from-[#0d1527] to-[#111827] border border-slate-800 rounded-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center shadow-lg hover-target cursor-default">
        <div className="group">
           <div className="w-16 h-16 mx-auto bg-blue-900/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-900/40 transition-colors border border-blue-500/20">
             <Zap className="w-8 h-8 text-blue-400" />
           </div>
           <h4 className="text-white font-bold text-lg mb-3">Data-Driven</h4>
           <p className="text-slate-400 text-sm leading-relaxed">Ra quyết định dựa trên dữ liệu thật, A/B test liên tục để tìm ra công thức Win.</p>
        </div>
        <div className="group">
           <div className="w-16 h-16 mx-auto bg-cyan-900/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-900/40 transition-colors border border-cyan-500/20">
             <Target className="w-8 h-8 text-cyan-400" />
           </div>
           <h4 className="text-white font-bold text-lg mb-3">Tracking Chuẩn</h4>
           <p className="text-slate-400 text-sm leading-relaxed">Thiết lập luồng tracking Server-side (CAPI, GA4) không bỏ sót chuyển đổi.</p>
        </div>
        <div className="group">
           <div className="w-16 h-16 mx-auto bg-purple-900/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-purple-900/40 transition-colors border border-purple-500/20">
             <TrendingUp className="w-8 h-8 text-purple-400" />
           </div>
           <h4 className="text-white font-bold text-lg mb-3">Scale Bền Vững</h4>
           <p className="text-slate-400 text-sm leading-relaxed">Tăng ngân sách mượt mà, cấu trúc lại phễu để giữ vững CPA khi Scale.</p>
        </div>
      </div>
    </section>

    {/* SECTION: DÒNG THỜI GIAN (Timeline) */}
    <section className="max-w-[1000px] mx-auto px-4 mb-32">
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 mb-4 bg-blue-900/30 text-blue-400 font-mono text-xs rounded uppercase tracking-widest border border-blue-500/20">Thành Tựu & Hành Trình</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dòng Thời Gian Phát Triển</h2>
      </div>

      <div className="relative border-l-2 border-slate-800 md:border-l-0 md:flex md:flex-col ml-4 md:ml-0">
         <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-slate-800 -translate-x-1/2"></div>
         
         {timelineData.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className={`relative w-full mb-12 md:w-1/2 pl-8 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right md:self-start' : 'md:pl-12 md:text-left md:self-end'}`}>
                <div className={`absolute top-0 left-[-17px] md:top-0 w-8 h-8 rounded-full bg-[#1e293b] border-2 border-blue-500 flex items-center justify-center text-sm z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${isLeft ? 'md:left-auto md:right-[-16px]' : 'md:left-[-16px]'}`}>
                  {item.icon}
                </div>

                <div className="bg-[#111827] border border-slate-800 p-6 md:p-8 rounded-xl hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.05)] transition-all hover-target cursor-default">
                  <div className={`flex flex-wrap items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                    <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded text-xs font-mono border border-slate-700">🗓 {item.year}</span>
                    {item.status && <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-mono font-bold shadow-[0_0_10px_rgba(37,99,235,0.4)]">{item.status}</span>}
                  </div>
                  <h4 className="text-white font-bold text-xl mb-3">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
         })}
      </div>
    </section>

    {/* SECTION: CHỨNG CHỈ & KHÓA HỌC */}
    <section className="max-w-[1000px] mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certificatesData.map((cert, idx) => (
          <div key={idx} className="bg-[#111827] border border-slate-800 p-6 rounded-xl flex items-center gap-5 hover:border-blue-500/50 transition-colors group hover-target cursor-default">
            <div className="bg-blue-900/30 p-4 rounded-xl text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">{cert.title}</h4>
              <p className="text-slate-400 text-sm">{cert.source}</p>
              <p className="text-blue-500 text-xs font-mono mt-2">{cert.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

  </main>
);

const ServicesPage = () => (
  <main className="w-full max-w-[1400px] mx-auto px-4 pt-32 pb-24">
    <SectionHeading subtitle="SERVICES" title="GIẢI PHÁP TĂNG TRƯỞNG" />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicesData.map((s, i) => {
        const Icon = s.Icon;
        return (
          <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-lg hover:border-blue-500/50 transition-all group hover-target cursor-default">
            <div className="bg-slate-800 w-12 h-12 rounded flex items-center justify-center mb-6 group-hover:bg-blue-900/30 transition-colors">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
          </div>
        );
      })}
    </div>
  </main>
);

const ContactPage = () => (
  <main className="w-full max-w-[800px] mx-auto px-4 pt-32 pb-24">
    <SectionHeading subtitle="CONTACT" title="LIÊN HỆ TRỰC TIẾP" />
    
    <div className="bg-[#111827] border border-slate-800 p-8 rounded-lg mb-8 hover-target cursor-default">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <a href="https://zalo.me/0986403720" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-slate-900 border border-slate-700 p-4 rounded hover:border-blue-500 transition-colors hover-target">
          <div className="bg-blue-600/20 text-blue-400 p-3 rounded"><Zap size={24}/></div>
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">ZALO / HOTLINE</div>
            <div className="text-white font-bold">0986 403 720</div>
          </div>
        </a>
        <a href="mailto:hoang.ads.digital@gmail.com" className="flex items-center gap-4 bg-slate-900 border border-slate-700 p-4 rounded hover:border-blue-500 transition-colors hover-target">
          <div className="bg-blue-600/20 text-blue-400 p-3 rounded"><Mail size={24}/></div>
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">EMAIL LÀM VIỆC</div>
            <div className="text-white font-bold text-sm">hoang.ads.digital@gmail.com</div>
          </div>
        </a>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">HỌ TÊN_</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors hover-target" placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">SỐ ĐIỆN THOẠI_</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors hover-target" placeholder="098..." />
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">YÊU CẦU TƯ VẤN_</label>
          <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors resize-none hover-target" placeholder="Vấn đề chạy Ads, setup tracking, scale ngân sách..."></textarea>
        </div>
        <Button type="submit" className="w-full uppercase tracking-widest !py-4 hover-target">Gửi Yêu Cầu</Button>
      </form>
    </div>
  </main>
);

// ==========================================
// 5. MAIN APP
// ==========================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    // DARK THEME WRAPPER + GRID BACKGROUND
    <div className="min-h-screen bg-[#0a0f1c] font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden">
      
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      
      <CustomCursor />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="animate-in fade-in duration-500 relative z-10">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      <footer className="border-t border-slate-800 bg-[#0a0f1c] relative z-10 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-mono hover-target cursor-default">
          <p>© {new Date().getFullYear()} Hoàng Nguyễn. Setup Code & Tracking.</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/hoangmmo99" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover-target px-2">Facebook</a>
            <a href="https://www.linkedin.com/in/hoà%C3%A0ng-nguyễ%E1%BB%85n-9a73142b7/" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover-target px-2">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}