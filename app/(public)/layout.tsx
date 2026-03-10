import PublicHeader from "@/components/shared/public-header";
import PublicFooter from "@/components/shared/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="container mx-auto flex-grow">{children}</main>
      <PublicFooter />
    </div>
  );
}
                       