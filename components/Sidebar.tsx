"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Workflow,
  BookOpen,
  Plug,
  BarChart3,
  FileText,
  Settings,
  Cpu,
  MemoryStick,
  Network,
  Zap,
  Rocket,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Agents", icon: Users, href: "/agents" },
  { label: "Tasks", icon: CheckSquare, href: "/tasks" },
  { label: "Workflows", icon: Workflow, href: "/workflows" },
  { label: "Knowledge Base", icon: BookOpen, href: "/knowledge-base" },
  { label: "Integrations", icon: Plug, href: "/integrations" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Logs", icon: FileText, href: "/logs" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-gray-800 bg-[#0B0F19]">
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400">
          <Rocket className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white">NEXUS</span>
          <span className="text-xs text-gray-500">AI Orchestration</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={
                    active
                      ? "flex items-center gap-3 rounded-lg bg-purple-900/30 px-3 py-2 text-sm font-medium text-purple-400 border-l-2 border-purple-500"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-gray-800/50 hover:text-white"
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            System Status
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <Cpu className="h-3.5 w-3.5" /> CPU
                </span>
                <span className="text-gray-300">42%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[42%] rounded-full bg-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <MemoryStick className="h-3.5 w-3.5" /> Memory
                </span>
                <span className="text-gray-300">68%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[68%] rounded-full bg-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <Network className="h-3.5 w-3.5" /> Connections
                </span>
                <span className="text-gray-300">24</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[60%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-400">
                  <Zap className="h-3.5 w-3.5" /> API Rate
                </span>
                <span className="text-gray-300">85%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[85%] rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
