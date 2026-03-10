import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, BarChart3, Users, Sparkles, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <div className="mb-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-600">
                Nhà phân phối uy tín #1 tại Việt Nam
              </div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-tight">
                Đối tác phân phối <br />
                <span className="text-pink-600">Mỹ phẩm Hàn Quốc</span> <br />
                chính hãng
              </h1>
              <p className="mb-10 max-w-xl text-lg text-slate-600 leading-relaxed">
                Harico Global - đơn vị phân phối độc quyền các thương hiệu mỹ phẩm hàng đầu từ Hàn Quốc. Cung cấp giải pháp toàn diện cho đại lý, spa, clinic và đối tác kinh doanh trên toàn quốc.
              </p>
              <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700"
                >
                  Đăng ký làm đại lý
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:bg-slate-50"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-12 border-t border-slate-100 pt-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-500">Thương hiệu</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500">Đối tác</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">63</div>
                  <div className="text-sm text-slate-500">Tỉnh thành</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl lg:h-[500px]">
                <Image
                  src="https://picsum.photos/seed/seoul-night/800/600"
                  alt="Korean Beauty Distribution"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 max-w-[280px] rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">100% Chính hãng</h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Cam kết nguồn gốc xuất xứ rõ ràng, đầy đủ giấy tờ chứng nhận
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Giải pháp của chúng tôi</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Chúng tôi cung cấp các công cụ cần thiết để bạn phát triển kinh doanh bền vững trong ngành làm đẹp.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Phân phối độc quyền',
                desc: 'Đưa các thương hiệu mỹ phẩm hàng đầu Hàn Quốc về Việt Nam với chính sách tốt nhất.',
                icon: <Globe className="text-pink-600" size={32} />,
              },
              {
                title: 'Hỗ trợ Marketing',
                desc: 'Cung cấp tài liệu, hình ảnh và chiến lược quảng bá chuyên nghiệp cho đại lý.',
                icon: <Sparkles className="text-pink-600" size={32} />,
              },
              {
                title: 'Cam kết chất lượng',
                desc: '100% sản phẩm chính hãng, đầy đủ giấy tờ công bố và kiểm định chất lượng.',
                icon: <ShieldCheck className="text-pink-600" size={32} />,
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6">{f.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
