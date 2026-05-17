import { AppHeader } from "./AppHeader";
import { useMobileMenu } from "./mobile-menu";

export function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const openMenu = useMobileMenu();
  return (
    <>
      <AppHeader title={title} subtitle={subtitle} onMenuClick={openMenu} />
      <div className="px-6 lg:px-10 py-8 lg:py-10 max-w-[1600px] mx-auto">{children}</div>
    </>
  );
}
