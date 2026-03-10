import { MOCK_POSTS } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Tag as TagIcon } from 'lucide-react';

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2" size={16} />
          Quay lại Blog
        </Link>

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-4 text-sm font-medium text-blue-600">
            <span className="rounded-full bg-blue-50 px-3 py-1">{post.category?.name}</span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <span className="font-medium text-slate-900">Admin</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {post.createdAt}
            </div>
          </div>
        </header>

        <div className="relative mb-12 aspect-video overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>
            Đây là nội dung mẫu cho bài viết. Trong thực tế, bạn sẽ sử dụng một thư viện như 
            <code>react-markdown</code> hoặc render HTML từ một CMS/Editor chuyên dụng.
          </p>
          <p>
            Kiến trúc này đã sẵn sàng để bạn tích hợp với các Headless CMS hoặc Backend NestJS của mình.
          </p>
        </div>

        <footer className="mt-12 border-t pt-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                <TagIcon size={12} />
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
