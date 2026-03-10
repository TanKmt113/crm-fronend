import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold">CORPBASE</Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Giải pháp quản trị doanh nghiệp toàn diện từ website giới thiệu đến hệ thống CRM chuyên sâu.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Công ty</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/gioi-thieu" className="hover:text-primary">Về chúng tôi</Link></li>
              <li><Link href="/dich-vu" className="hover:text-primary">Dịch vụ</Link></li>
              <li><Link href="/lien-he" className="hover:text-primary">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Pháp lý</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="hover:text-primary">Chính sách bảo mật</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CorpBase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
