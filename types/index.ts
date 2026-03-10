// --- Base Types ---
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// --- Auth Types ---
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// --- Blog Types ---
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
}

export interface Post extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  authorId: string;
  categoryId: string;
  category?: Category;
  tags: string[];
  isFeatured: boolean;
  status: 'DRAFT' | 'PUBLISHED';
}

// --- CRM Types (Phase 2) ---
export interface Customer extends BaseEntity {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LEAD';
}

// --- Website Settings Types ---
export interface HomepageSection {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface WebsiteSettings {
  logo: string;
  banner: string;
  homepageSections: HomepageSection[];
}

export interface WebsiteSettingsUpdatePayload {
  logo?: File;
  banner?: File;
  sections?: HomepageSection[];
}

export interface Receivable extends BaseEntity {
  customerId: string;
  customer?: Customer;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  description?: string;
}

// --- API Response Wrapper ---
export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}
