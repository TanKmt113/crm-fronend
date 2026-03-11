import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  ShieldCheck,
  Truck,
  BarChart3,
  HeadphonesIcon,
  BadgeCheck,
  Users,
  Package,
  Zap,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Phân phối độc quyền',
    desc: 'Đưa các thương hiệu mỹ phẩm hàng đầu Hàn Quốc về Việt Nam với chính sách nhập khẩu tối ưu và độc quyền theo khu vực.',
    features: ['Hơn 15 thương hiệu K-Beauty', 'Độc quyền theo vùng miền', 'Chính sách giá ưu đãi cho đại lý', 'Cam kết hàng chính hãng 100%'],
    image: 'https://picsum.photos/seed/distribution/600/400',
    badge: 'Cốt lõi',
    badgeColor: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Sparkles,
    title: 'Hỗ trợ Marketing',
    desc: 'Cung cấp đầy đủ tài nguyên truyền thông: hình ảnh, video, nội dung mạng xã hội và chiến lược quảng bá chuyên nghiệp cho đại lý.',
    features: ['Bộ ảnh sản phẩm chất lượng cao', 'Nội dung mạng xã hội sẵn sàng', 'Hỗ trợ chạy quảng cáo', 'Template thiết kế thương hiệu'],
    image: 'https://picsum.photos/seed/marketing/600/400',
    badge: 'Phổ biến',
    badgeColor: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Truck,
    title: 'Logistics & Giao hàng',
    desc: 'Hệ thống kho vận trải rộng toàn quốc, đảm bảo giao hàng nhanh chóng, đúng hạn và an toàn tới mọi tỉnh thành.',
    features: ['Kho tại TP.HCM, Hà Nội, Đà Nẵng', 'Giao nội thành 1–2 ngày', 'Đóng gói chuyên nghiệp', 'Theo dõi đơn hàng real-time'],
    image: 'https://picsum.photos/seed/logistics/600/400',
    badge: 'Toàn quốc',
    badgeColor: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Tư vấn kinh doanh',
    desc: 'Đội ngũ chuyên gia đồng hành cùng đối tác trong xây dựng chiến lược kinh doanh, phân tích thị trường và mở rộng tệp khách hàng.',
    features: ['Phân tích thị trường địa phương', 'Tư vấn danh mục sản phẩm', 'Lập kế hoạch bán hàng', 'Review định kỳ hàng quý'],
    image: 'https://picsum.photos/seed/consulting/600/400',
    badge: 'Cao cấp',
    badgeColor: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'Hỗ trợ sau bán hàng',
    desc: 'Dịch vụ chăm sóc khách hàng chuyên nghiệp, giải quyết mọi vấn đề phát sinh nhanh chóng qua đa kênh hỗ trợ.',
    features: ['Hotline 8:00 – 18:00 các ngày trong tuần', 'Chat trực tuyến qua Zalo / Messenger', 'Xử lý khiếu nại trong 24 giờ', 'Chính sách đổi trả linh hoạt'],
    image: 'https://picsum.photos/seed/support/600/400',
    badge: 'Luôn sẵn sàng',
    badgeColor: 'bg-green-50 text-green-600',
  },
  {
    icon: ShieldCheck,
    title: 'Đảm bảo chất lượng',
    desc: 'Mỗi lô hàng đều được kiểm tra nghiêm ngặt, có đầy đủ hồ sơ chứng nhận xuất xứ và kiểm định chất lượng của Bộ Y tế.',
    features: ['Kiểm định từng lô hàng nhập về', 'Đầy đủ CO, CQ, công bố sản phẩm', 'Hạn sử dụng đảm bảo tối thiểu 18 tháng', 'Bảo quản đúng chuẩn kho lạnh'],
    image: 'https://picsum.photos/seed/quality/600/400',
    badge: 'Tiêu chuẩn',
    badgeColor: 'bg-rose-50 text-rose-600',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Tư vấn & Khảo sát', desc: 'Chuyên gia lắng nghe nhu cầu và tư vấn danh mục sản phẩm phù hợp với mô hình kinh doanh của bạn.' },
  { step: '02', title: 'Ký kết hợp tác', desc: 'Hoàn thiện thủ tục ký kết và thiết lập tài khoản đại lý với chính sách giá và chiết khấu cụ thể.' },
  { step: '03', title: 'Đặt hàng & Giao nhận', desc: 'Đặt hàng trên hệ thống, thanh toán linh hoạt, nhận hàng tại kho hoặc giao tận nơi toàn quốc.' },
  { step: '04', title: 'Đồng hành phát triển', desc: 'Đội ngũ kinh doanh hỗ trợ liên tục, cung cấp tài nguyên marketing và review định kỳ hiệu quả.' },
];

const STATS = [
  { value: '15+', label: 'Thương hiệu K-Beauty', icon: Package },
  { value: '500+', label: 'Đối tác toàn quốc', icon: Users },
  { value: '63', label: 'Tỉnh thành phủ sóng', icon: Globe },
  { value: '99%', label: 'Khách hàng hài lòng', icon: BadgeCheck },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-pink-50 opacity-50" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full bg-pink-50 opacity-40" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-600">
              Giải pháp toàn diện cho đối tác
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-tight">
              Dịch vụ của <span className="text-pink-600">Harico Global</span>
            </h1>
            <p className="mb-10 text-lg text-slate-600 leading-relaxed">
              Chúng tôi không chỉ cung cấp sản phẩm — chúng tôi xây dựng hệ sinh thái hỗ trợ toàn diện giúp đại lý, spa và clinic phát triển bền vững trong ngành làm đẹp.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700"
              >
                Tư vấn miễn phí
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:bg-slate-50"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center gap-2 py-8 text-center">
                  <Icon className="text-pink-600" size={24} />
                  <div className="text-3xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Danh mục dịch vụ</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Mỗi dịch vụ được thiết kế để giải quyết một thách thức cụ thể mà đối tác kinh doanh thường gặp.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={svc.title}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden rounded-3xl shadow-lg lg:h-96">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div>
                    <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${svc.badgeColor}`}>
                      {svc.badge}
                    </span>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50">
                        <Icon className="text-pink-600" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">{svc.title}</h3>
                    </div>
                    <p className="mb-6 text-slate-600 leading-relaxed">{svc.desc}</p>
                    <ul className="space-y-3">
                      {svc.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="shrink-0 text-pink-500" size={18} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Quy trình hợp tác</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Chỉ 4 bước đơn giản để bắt đầu hành trình phân phối mỹ phẩm cùng Harico Global.</p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden border-t-2 border-dashed border-pink-100 lg:block" />

            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pink-600 text-white shadow-lg shadow-pink-200">
                  <span className="text-xl font-extrabold">{step.step}</span>
                </div>
                <h4 className="mb-3 text-lg font-bold text-slate-900">{step.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing hint */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Gói hợp tác</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Linh hoạt theo quy mô kinh doanh, từ cá nhân đến hệ thống chuỗi lớn.</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: 'Đại lý cấp 2',
                price: 'Từ 5 triệu',
                unit: '/ đơn đầu tiên',
                desc: 'Phù hợp với spa, clinic nhỏ, cá nhân kinh doanh online mới bắt đầu.',
                features: ['Tối thiểu 1 sản phẩm/lần đặt', 'Chiết khấu 15–20%', 'Hỗ trợ tài liệu cơ bản', 'Giao hàng toàn quốc'],
                cta: 'Đăng ký ngay',
                highlight: false,
              },
              {
                name: 'Đại lý cấp 1',
                price: 'Từ 20 triệu',
                unit: '/ tháng',
                desc: 'Dành cho chuỗi spa, hệ thống phân phối khu vực với nhu cầu lớn và ổn định.',
                features: ['Ưu tiên đặt hàng & kho riêng', 'Chiết khấu 25–35%', 'Marketing full-package', 'Chuyên viên hỗ trợ riêng'],
                cta: 'Liên hệ tư vấn',
                highlight: true,
              },
              {
                name: 'Đối tác chiến lược',
                price: 'Liên hệ',
                unit: 'thương lượng',
                desc: 'Giải pháp tùy chỉnh cho tập đoàn, chuỗi toàn quốc hoặc xuất khẩu sang thị trường khác.',
                features: ['Độc quyền nhãn hàng theo vùng', 'Chiết khấu đặc biệt', 'Đồng hành chiến lược dài hạn', 'Tích hợp CRM & báo cáo'],
                cta: 'Thảo luận ngay',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-3xl p-8 ${
                  plan.highlight
                    ? 'bg-pink-600 text-white shadow-2xl shadow-pink-200 ring-4 ring-pink-600 ring-offset-2'
                    : 'bg-white shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                    Phổ biến nhất
                  </div>
                )}
                <h3 className={`mb-1 text-lg font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <div className="mb-4 flex items-end gap-1">
                  <span className={`text-3xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`mb-1 text-sm ${plan.highlight ? 'text-pink-100' : 'text-slate-500'}`}>{plan.unit}</span>
                </div>
                <p className={`mb-6 text-sm leading-relaxed ${plan.highlight ? 'text-pink-100' : 'text-slate-600'}`}>{plan.desc}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white' : 'text-slate-700'}`}>
                      <Zap className={`shrink-0 ${plan.highlight ? 'text-pink-200' : 'text-pink-500'}`} size={16} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/lien-he"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    plan.highlight
                      ? 'bg-white text-pink-600 hover:bg-pink-50'
                      : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl bg-pink-600 px-8 py-14 text-center md:px-16 lg:py-20">
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Sẵn sàng trở thành đối tác của Harico Global?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-pink-100 leading-relaxed">
              Hơn 500 đối tác đã tin tưởng và phát triển cùng chúng tôi. Hãy để chúng tôi đồng hành cùng bạn.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-bold text-pink-600 transition-all hover:bg-pink-50"
              >
                Liên hệ ngay
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-pink-700/60 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700"
              >
                Xem câu chuyện thành công
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
