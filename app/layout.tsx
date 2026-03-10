import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Corporate & CRM Base | Next.js",
    template: "%s | Corporate & CRM Base",
  },
  description:
    "Production-ready Next.js base for corporate websites and CRM systems.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://example.com",
    siteName: "Corporate Base",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AntdRegistry>
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
