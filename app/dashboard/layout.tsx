// app/(dashboard)/layout.tsx
import { DashboardNav } from "@/components/dashboard-nav";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 text-xl font-bold tracking-tighter border-b border-stone-200">
          <span className="bg-black text-white px-2 py-0.5 rounded mr-2">
            S
          </span>
          SimulAI
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardNav />
        </div>
        <div className="p-4 border-t">
          <div className="bg-slate-50 p-3 rounded-lg border">
            <p className="text-xs font-semibold">UBC Location</p>
            <p className="text-[10px] text-muted-foreground truncate">
              Perugia Italian Caffè
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64">
        <div className="h-screen overflow-auto">{children}</div>
      </main>
    </div>
  );
}
