'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Facebook, Instagram, Youtube } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    label: 'Điện thoại',
    value: '1800 1234 (Miễn phí)',
    href: 'tel:18001234',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@haricoglobal.vn',
    href: 'mailto:contact@haricoglobal.vn',
  },
  {
    icon: Clock,
    label: 'Giờ làm việc',
    value: 'Thứ 2 – Thứ 7: 8:00 – 18:00',
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-pink-50 opacity-60" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[300px] w-[300px] rounded-full bg-pink-50 opacity-40" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-600">
            Chúng tôi luôn sẵn sàng hỗ trợ
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Liên hệ với <span className="text-pink-600">Harico Global</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
            Bạn quan tâm đến hợp tác phân phối, tư vấn sản phẩm, hoặc cần hỗ trợ? Hãy để lại thông tin — đội ngũ của chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm text-center transition-all hover:shadow-md h-full">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
                    <Icon className="text-pink-600" size={26} />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-600">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{item.value}</p>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">Gửi tin nhắn cho chúng tôi</h2>
              <p className="mb-8 text-slate-600">Điền thông tin vào form bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 p-16 text-center">
                  <CheckCircle2 className="mb-4 text-green-500" size={56} />
                  <h3 className="mb-2 text-xl font-bold text-slate-900">Gửi thành công!</h3>
                  <p className="text-slate-600">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                    className="mt-8 rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-pink-700"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Họ và tên <span className="text-pink-600">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Số điện thoại <span className="text-pink-600">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0901 234 567"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Chủ đề <span className="text-pink-600">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all bg-white"
                    >
                      <option value="" disabled>-- Chọn chủ đề --</option>
                      <option value="agency">Đăng ký làm đại lý / đối tác</option>
                      <option value="product">Tư vấn sản phẩm</option>
                      <option value="order">Hỏi về đơn hàng</option>
                      <option value="support">Hỗ trợ kỹ thuật</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Nội dung tin nhắn <span className="text-pink-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Mô tả yêu cầu của bạn..."
                      className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Gửi tin nhắn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Map Embed */}
              <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-100">
                <iframe
                  title="Harico Global Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6635!2d106.6996!3d10.7340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ0JzAyLjQiTiAxMDbCsDQxJzU4LjYiRQ!5e0!3m2!1svi!2svn!4v1630000000000!5m2!1svi!2svn"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Social & CTA */}
              <div className="rounded-2xl bg-slate-50 p-7">
                <h3 className="mb-1 text-lg font-bold text-slate-900">Theo dõi chúng tôi</h3>
                <p className="mb-5 text-sm text-slate-600">Cập nhật tin tức, sản phẩm mới và ưu đãi hàng ngày.</p>
                <div className="flex gap-3">
                  <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Agency CTA */}
              <div className="rounded-2xl bg-pink-600 p-7 text-white">
                <h3 className="mb-2 text-lg font-bold">Muốn trở thành đại lý?</h3>
                <p className="mb-5 text-sm text-pink-100 leading-relaxed">
                  Tham gia mạng lưới hơn 500 đối tác tin cậy của Harico Global trên toàn quốc.
                </p>
                <a
                  href="#"
                  className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-pink-600 transition-colors hover:bg-pink-50"
                >
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Strip */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">Câu hỏi thường gặp</h2>
            <p className="text-slate-600">Một số thắc mắc phổ biến từ đối tác và khách hàng.</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                q: 'Điều kiện để trở thành đại lý là gì?',
                a: 'Bạn cần có cơ sở kinh doanh hợp pháp (spa, clinic, thẩm mỹ viện hoặc cửa hàng mỹ phẩm) và cam kết đơn hàng tối thiểu theo chính sách của Harico.',
              },
              {
                q: 'Thời gian giao hàng mất bao lâu?',
                a: 'Khu vực TP. HCM từ 1–2 ngày, các tỉnh thành khác từ 3–5 ngày làm việc tùy địa điểm.',
              },
              {
                q: 'Sản phẩm có đảm bảo chính hãng không?',
                a: '100% sản phẩm đều nhập khẩu trực tiếp từ nhà sản xuất Hàn Quốc và có đầy đủ giấy tờ kiểm định, công bố chất lượng.',
              },
              {
                q: 'Tôi có thể đặt mẫu thử trước khi đặt hàng không?',
                a: 'Có, chúng tôi hỗ trợ bộ mẫu thử cho các đối tác mới. Vui lòng liên hệ nhân viên kinh doanh để được tư vấn.',
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-2 font-bold text-slate-900">Q: {faq.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
