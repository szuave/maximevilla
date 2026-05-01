import { DesktopSidebar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="relative z-[2] mx-auto flex w-full max-w-[1920px] flex-1 flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          <main id="main" className="min-w-0 flex-1">
            {children}
          </main>
          <DesktopSidebar />
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
