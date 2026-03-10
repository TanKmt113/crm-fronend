import { Category, Post, Customer, Receivable, WebsiteSettings, HomepageSection } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Công nghệ', slug: 'cong-nghe', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Kinh doanh', slug: 'kinh-doanh', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '3', name: 'Thông báo', slug: 'thong-bao', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Giải pháp chuyển đổi số cho doanh nghiệp B2B',
    slug: 'giai-phap-chuyen-doi-so-cho-doanh-nghiep-b2b',
    excerpt: 'Khám phá các xu hướng chuyển đổi số mới nhất giúp tối ưu hóa quy trình vận hành...',
    content: '<p>Nội dung chi tiết về chuyển đổi số...</p>',
    thumbnail: 'https://picsum.photos/seed/tech/800/450',
    authorId: 'admin-1',
    categoryId: '1',
    category: MOCK_CATEGORIES[0],
    tags: ['Digital Transformation', 'B2B'],
    isFeatured: true,
    status: 'PUBLISHED',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: '2',
    title: 'Tối ưu hóa quản lý công nợ hiệu quả',
    slug: 'toi-uu-hoa-quan-ly-cong-no-hieu-qua',
    excerpt: 'Làm thế nào để giảm thiểu nợ xấu và tăng dòng tiền cho doanh nghiệp của bạn?',
    content: '<p>Nội dung chi tiết về quản lý công nợ...</p>',
    thumbnail: 'https://picsum.photos/seed/finance/800/450',
    authorId: 'admin-1',
    categoryId: '2',
    category: MOCK_CATEGORIES[1],
    tags: ['Finance', 'Management'],
    isFeatured: false,
    status: 'PUBLISHED',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-05',
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Nguyễn Văn A', companyName: 'Công ty TNHH ABC', email: 'a@abc.com', phone: '0901234567', status: 'ACTIVE', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: 'c2', name: 'Trần Thị B', companyName: 'Tập đoàn XYZ', email: 'b@xyz.com', phone: '0907654321', status: 'LEAD', createdAt: '2024-02-15', updatedAt: '2024-02-15' },
];

export const MOCK_RECEIVABLES: Receivable[] = [
  { id: 'r1', customerId: 'c1', customer: MOCK_CUSTOMERS[0], amount: 50000000, dueDate: '2024-04-01', status: 'PENDING', createdAt: '2024-03-01', updatedAt: '2024-03-01' },
];

export const MOCK_HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: '1', name: 'Hero Banner', enabled: true, order: 1 },
  { id: '2', name: 'Giới thiệu dịch vụ', enabled: true, order: 2 },
  { id: '3', name: 'Bài viết nổi bật', enabled: true, order: 3 },
  { id: '4', name: 'Đối tác', enabled: true, order: 4 },
  { id: '5', name: 'Liên hệ', enabled: true, order: 5 },
];

export const MOCK_WEBSITE_SETTINGS: WebsiteSettings = {
  logo: 'https://placehold.co/200x60/png?text=CorpBase+Logo',
  banner: 'https://placehold.co/1200x400/png?text=Welcome+Banner',
  homepageSections: MOCK_HOMEPAGE_SECTIONS,
};
