import Link from 'next/link';
import Image from 'next/image';
import { MOCK_POSTS, MOCK_CATEGORIES } from '@/lib/mock-data';
import { Calendar, User, ChevronRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Blog & Tin tức</h1>
          <p className="text-slate-600">Cập nhật kiến thức và xu hướng mới nhất về quản trị doanh nghiệp.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className="group overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-lg">
            <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  Admin
                </span>
              </div>
              <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline"
              >
                Đọc tiếp
                <ChevronRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
