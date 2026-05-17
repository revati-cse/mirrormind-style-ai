import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { MobileMenuContext } from "@/components/app/mobile-menu";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Atelier — MirrorMind AI" },
      { name: "description", content: "Your AI fashion intelligence command center." },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-background relative">
      <div className={`lg:hidden fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`absolute inset-y-0 left-0 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <main className="flex-1 min-w-0 relative">
        <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        <div className="relative">
          <MobileMenuContext.Provider value={() => setOpen(true)}>
            <Outlet />
          </MobileMenuContext.Provider>
        </div>
      </main>
    </div>
  );
}
