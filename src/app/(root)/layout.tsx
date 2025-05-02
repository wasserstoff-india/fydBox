import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
