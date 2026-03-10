import Link from 'next/link';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Trophy, Check, FileText } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0B1221] text-slate-300">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E11D48] text-white font-bold text-xl">
                H
              </div>
              <span className="text-xl font-bold text-white">Harico Global</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              Nhà phân phối mỹ phẩm Hàn Quốc chính hãng hàng đầu tại Việt Nam. Đối tác tin cậy của hơn 500 spa, clinic và đại lý trên toàn quốc.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white">Về chúng tôi</h4>
            <ul className="mt-6 space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Giới thiệu công ty</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Thương hiệu phân phối</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Năng lực phân phối</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Đối tác của chúng tôi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tin tức & Sự kiện</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white">Hỗ trợ đại lý</h4>
            <ul className="mt-6 space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Đăng ký làm đại lý</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách hợp tác</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tài liệu đào tạo</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tài liệu Marketing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-5">
            <h4 className="text-lg font-bold text-white">Liên hệ</h4>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 text-[#E11D48] shrink-0" />
                <span>Tòa nhà ABC, Đường XYZ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#E11D48] shrink-0" />
                <span>1900 xxxx (8:00 - 18:00)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#E11D48] shrink-0" />
                <span>partner@haricoglobal.vn</span>
              </li>
            </ul>

            {/* Working Hours Box */}
            <div className="mt-8 rounded-xl bg-slate-800/30 p-6 border border-slate-800/50">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Giờ làm việc:</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Thứ 2 - Thứ 6:</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Thứ 7:</span>
                  <span>8:00 - 12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/20 p-8 border border-slate-800/50 text-center">
            <Trophy className="mb-4 text-orange-400" size={32} />
            <h5 className="font-bold text-white">Đại lý ủy quyền chính thức</h5>
            <p className="mt-2 text-xs text-slate-500">Từ các thương hiệu Hàn Quốc</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/20 p-8 border border-slate-800/50 text-center">
            <Check className="mb-4 text-blue-400" size={32} />
            <h5 className="font-bold text-white">Chứng nhận ISO 9001:2015</h5>
            <p className="mt-2 text-xs text-slate-500">Quản lý chất lượng quốc tế</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/20 p-8 border border-slate-800/50 text-center">
            <FileText className="mb-4 text-yellow-400" size={32} />
            <h5 className="font-bold text-white">Giấy phép kinh doanh</h5>
            <p className="mt-2 text-xs text-slate-500">Đầy đủ theo quy định pháp luật</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 text-xs text-slate-500">
          <p>© 2026 Harico Global. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách đổi trả</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
