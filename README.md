# Corporate & CRM Base (Next.js 15)

Bộ khung Frontend chuyên nghiệp được xây dựng bằng Next.js (App Router), tối ưu cho các dự án doanh nghiệp kết hợp giữa Website giới thiệu và Hệ thống quản trị (CRM).

## 🚀 Công nghệ sử dụng

- **Framework:** Next.js 15 (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** 
  - **Public Site:** Shadcn/ui (Custom) + Lucide Icons
  - **Admin Site:** Ant Design (Tối ưu CRUD)
- **State Management:** TanStack Query v5 (Server State) + Zustand (Client State)
- **Form:** React Hook Form + Zod
- **API Client:** Axios (với Interceptors xử lý Auth)
- **Animation:** Motion (framer-motion)

## 📁 Cấu trúc thư mục

```text
app/
├── (public)/       # Website giới thiệu & Blog (SEO focus)
├── (admin)/        # Khu vực quản trị (Operation focus)
├── api/            # Next.js Internal API routes
├── layout.tsx      # Root layout & Providers
└── not-found.tsx   # Custom 404 page
components/
├── ui/             # Atomic components (Shadcn-like)
└── shared/         # Layout components (Header, Footer, Sidebar)
features/           # Domain-driven modules
├── auth/           # Login, Logout, Session
├── blog/           # Post list, detail, categories
├── admin/          # Dashboard, Admin shared logic
├── customer/       # CRM Phase 2
└── receivable/     # Finance Phase 2
lib/
├── api/            # API Services (Axios wrappers)
├── auth/           # Auth utilities
├── api-client.ts   # Axios instance configuration
└── mock-data.ts    # Mock data for development
hooks/              # Custom React hooks
types/              # TypeScript interfaces/types
providers/          # React Context Providers
```

## 🛠 Hướng dẫn cài đặt

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cấu hình môi trường:**
   Sao chép `.env.example` thành `.env.local` và cập nhật các biến:
   ```bash
   cp .env.example .env.local
   ```

3. **Chạy ở chế độ phát triển:**
   ```bash
   npm run dev
   ```

## 📝 Lộ trình phát triển (Phase 2)

Dự án đã được thiết kế sẵn sàng để mở rộng:
- **Auth:** Thay thế mock logic trong `lib/api/auth.ts` bằng API thật.
- **CRM:** Triển khai các trang trong `app/(admin)/customers` sử dụng Ant Design Table và Form.
- **Finance:** Triển khai quản lý công nợ trong `app/(admin)/receivables`.
- **API:** Chuyển đổi `USE_MOCK = true` thành `false` trong các file API service để kết nối NestJS backend.

## 🔒 Bảo mật & Auth

- Khu vực `/admin` được bảo vệ bởi `AdminLayout` (có check token cơ bản).
- Khuyến khích sử dụng Middleware của Next.js để bảo vệ route phía server.
- API Client đã có sẵn Interceptor để đính kèm `Authorization` header.

---
*Phát triển bởi Senior Frontend Architect.*
