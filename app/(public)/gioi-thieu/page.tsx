import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Star,
  Trophy,
  Users,
  TrendingUp,
} from 'lucide-react';

const TIMELINE = [
  { year: '2015', title: 'Thành lập công ty', desc: 'Harico Global được thành lập tại TP. Hồ Chí Minh với sứ mệnh mang mỹ phẩm Hàn Quốc chính hãng đến người tiêu dùng Việt Nam.' },
  { year: '2017', title: 'Mở rộng danh mục', desc: 'Ký kết hợp tác độc quyền với 5 thương hiệu K-Beauty hàng đầu, mở rộng mạng lưới đại lý lên 100 đối tác.' },
  { year: '2019', title: 'Phủ sóng toàn quốc', desc: 'Khai trương kho hàng tại Hà Nội và Đà Nẵng, đưa tổng số đối tác vượt mốc 300 trên 63 tỉnh thành.' },
  { year: '2021', title: 'Chuyển đổi số', desc: 'Ra mắt nền tảng CRM và cổng đặt hàng trực tuyến cho đại lý, giảm 60% thời gian xử lý đơn hàng.' },
  { year: '2023', title: 'Top 3 nhà phân phối', desc: 'Được vinh danh Top 3 Nhà phân phối mỹ phẩm Hàn Quốc uy tín nhất Việt Nam bởi Hiệp hội Làm đẹp Việt Nam.' },
  { year: '2025', title: 'Hướng tới khu vực', desc: 'Bắt đầu thí điểm xuất khẩu sang thị trường Đông Nam Á, mở rộng mạng lưới vượt ngoài biên giới Việt Nam.' },
];

const VALUES = [
  { icon: Shield, title: 'Chính trực', desc: 'Chúng tôi cam kết minh bạch tuyệt đối về nguồn gốc, chất lượng và chính sách — không có điều khoản ẩn.' },
  { icon: Heart, title: 'Tận tâm', desc: 'Mỗi đối tác là một mối quan hệ lâu dài. Chúng tôi đặt thành công của bạn lên hàng đầu.' },
  { icon: Lightbulb, title: 'Đổi mới', desc: 'Liên tục cập nhật xu hướng K-Beauty và ứng dụng công nghệ để tối ưu trải nghiệm đối tác.' },
  { icon: Globe, title: 'Toàn cầu hóa', desc: 'Cầu nối giữa thương hiệu Hàn Quốc và thị trường Đông Nam Á, mang chuẩn mực quốc tế về từng cửa hàng.' },
];

const TEAM = [
  { name: 'Nguyễn Minh Hải', role: 'CEO & Đồng sáng lập', image: 'https://picsum.photos/seed/ceo/400/400', quote: '15 năm kinh nghiệm trong phân phối FMCG và làm đẹp.' },
  { name: 'Trần Thị Lan Anh', role: 'Giám đốc Kinh doanh', image: 'https://picsum.photos/seed/coo/400/400', quote: 'Chuyên gia xây dựng mạng lưới phân phối chuỗi bán lẻ.' },
  { name: 'Lê Quốc Bảo', role: 'Giám đốc Marketing', image: 'https://picsum.photos/seed/cmo/400/400', quote: 'Hơn 10 năm trong lĩnh vực thương hiệu và truyền thông số.' },
  { name: 'Phạm Thu Hương', role: 'Trưởng phòng Chất lượng', image: 'https://picsum.photos/seed/qa/400/400', quote: 'Đảm bảo 100% sản phẩm đạt chuẩn kiểm định trước khi đến tay đối tác.' },
];

const AWARDS = [
  { icon: Trophy, title: 'Top 3 nhà phân phối K-Beauty', org: 'Hiệp hội Làm đẹp Việt Nam', year: '2023' },
  { icon: Star, title: 'Doanh nghiệp xuất sắc', org: 'VCCI TP. Hồ Chí Minh', year: '2022' },
  { icon: TrendingUp, title: 'Thương hiệu tăng trưởng bền vững', org: 'Vietnam Business Awards', year: '2021' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-pink-50 opacity-50" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[320px] w-[320px] rounded-full bg-pink-50 opacity-40" />

        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-600">
                Câu chuyện của chúng tôi
              </div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-tight">
                Về <span className="text-pink-600">Harico Global</span>
              </h1>
              <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                Hơn 10 năm xây dựng cầu nối giữa tinh hoa mỹ phẩm Hàn Quốc và thị trường làm đẹp Việt Nam — Harico Global tự hào là đơn vị phân phối uy tín, chuyên nghiệp và tận tâm nhất trong ngành.
              </p>
              <ul className="mb-10 space-y-3">
                {[
                  'Nhà phân phối độc quyền 15+ thương hiệu K-Beauty hàng đầu',
                  'Mạng lưới hơn 500 đối tác trải dài 63 tỉnh thành',
                  'Cam kết 100% sản phẩm chính hãng, đầy đủ giấy tờ pháp lý',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-pink-500" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700"
                >
                  Hợp tác cùng chúng tôi
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/dich-vu"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-900 transition-all hover:bg-slate-50"
                >
                  Xem dịch vụ
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl lg:h-[500px]">
                <Image
                  src="https://picsum.photos/seed/harico-about/800/600"
                  alt="Harico Global team"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 max-w-[260px] rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">500+</div>
                    <div className="text-xs text-slate-500 leading-relaxed">Đối tác tin cậy trên toàn quốc</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 top-8 rounded-2xl bg-pink-600 p-5 shadow-xl text-white">
                <div className="text-2xl font-extrabold">10+</div>
                <div className="text-xs text-pink-100">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50">
                <Heart className="text-pink-600" size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Sứ mệnh</h2>
              <p className="text-slate-600 leading-relaxed">
                Kết nối tinh hoa mỹ phẩm Hàn Quốc với người tiêu dùng và đối tác kinh doanh Việt Nam — mang lại sản phẩm chất lượng thật, giá trị thật, và cơ hội kinh doanh bền vững cho từng đại lý trên khắp cả nước.
              </p>
            </div>
            <div className="rounded-3xl bg-pink-600 p-10 text-white shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Globe className="text-white" size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white">Tầm nhìn</h2>
              <p className="text-pink-100 leading-relaxed">
                Trở thành nền tảng phân phối mỹ phẩm K-Beauty hàng đầu Đông Nam Á vào năm 2030, với hệ sinh thái đối tác vượt 2.000 điểm bán và hiện diện tại ít nhất 5 quốc gia trong khu vực.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Giá trị cốt lõi</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Bốn nguyên tắc định hướng mọi quyết định và hành động của Harico Global.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="flex flex-col items-center rounded-2xl bg-slate-50 p-8 text-center transition-all hover:shadow-md">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
                    <Icon className="text-pink-600" size={30} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{val.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Hành trình phát triển</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Từ một ý tưởng nhỏ đến thương hiệu phân phối K-Beauty hàng đầu Việt Nam.</p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-pink-100 md:left-1/2 md:-translate-x-0.5" />

            <div className="flex flex-col gap-10">
              {TIMELINE.map((item, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={item.year} className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    {/* Dot */}
                    <div className="relative z-10 flex shrink-0 flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-pink-600 text-xs font-extrabold text-white shadow-lg">
                        {item.year.slice(2)}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`ml-4 flex-1 md:ml-0 md:w-[calc(50%-40px)] ${isRight ? 'md:mr-auto md:pr-0 md:pl-10' : 'md:ml-auto md:pl-0 md:pr-10'}`}>
                      <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-pink-600">{item.year}</span>
                        <h4 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Ban lãnh đạo</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Đội ngũ giàu kinh nghiệm, đam mê và cam kết đưa Harico Global lên tầm cao mới.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="group flex flex-col items-center text-center">
                <div className="relative mb-5 h-32 w-32 overflow-hidden rounded-full ring-4 ring-pink-100 transition-all group-hover:ring-pink-400">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-pink-600">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Giải thưởng & Ghi nhận</h2>
            <p className="mx-auto max-w-2xl text-slate-600">Những thành tích được ngành và cộng đồng kinh doanh công nhận.</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {AWARDS.map((award) => {
              const Icon = award.icon;
              return (
                <div key={award.title} className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
                    <Icon className="text-pink-600" size={30} />
                  </div>
                  <h4 className="mb-1 font-bold text-slate-900">{award.title}</h4>
                  <p className="text-sm text-slate-500">{award.org}</p>
                  <span className="mt-3 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600">{award.year}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl bg-pink-600 px-8 py-14 text-center md:px-16 lg:py-20">
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Cùng nhau tạo nên câu chuyện tiếp theo
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-pink-100 leading-relaxed">
              Dù bạn là spa nhỏ, clinic hay chuỗi bán lẻ lớn — đây là nơi câu chuyện hợp tác của chúng ta bắt đầu.
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
                href="/dich-vu"
                className="inline-flex items-center gap-2 rounded-lg bg-pink-700/60 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700"
              >
                Khám phá dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
