'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-9xl font-extrabold tracking-widest text-slate-900">404</h1>
      <div className="absolute rotate-12 rounded bg-blue-600 px-2 text-sm text-white">
        Trang không tìm thấy
      </div>
      <div className="mt-10 flex flex-col space-y-4">
        <p className="text-xl font-medium text-slate-600">
          Rất tiếc, chúng tôi không tìm thấy trang bạn đang yêu cầu.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
          >
            <Home size={18} />
            Về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
