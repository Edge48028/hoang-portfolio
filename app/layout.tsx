import type { Metadata } from "next";
import "./globals.css"; // Dòng này là bắt buộc để web có màu sắc và CSS

export const metadata: Metadata = {
  title: "Hoàng Nguyễn | Performance Marketing & Data Analyst",
  description: "Chuyên gia Digital Marketing kết hợp tư duy Data Science. Cung cấp giải pháp tối ưu Meta Ads, Google Ads, Tracking CAPI & Scale doanh thu bền vững.",
  openGraph: {
    title: "Hoàng Nguyễn | Performance Marketing",
    description: "Tối ưu chi phí, Scale doanh thu bằng dữ liệu thật.",
    type: "website",
    locale: "vi_VN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* Thêm class nền tối để tránh bị nháy trắng khi load trang */}
      <body className="bg-[#0a0f1c] text-white antialiased">
        {children}
      </body>
    </html>
  );
}