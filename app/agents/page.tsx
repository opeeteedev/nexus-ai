"use client";

import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import {
  Search,
  Settings,
  FileText,
  Users,
  Activity,
  CheckCircle2,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Filter,
  Plus,
} from "lucide-react";

type Agent = {
  name: string;
  role: string;
  status: "Active" | "Idle" | "Error";
  tasks: number;
  success: number;
  last: string;
  icon: React.ComponentType<{ className?: string }>;
};

const agents: Agent[] = [
  { name: "Research Agent", role: "Research", status: "Active", tasks: 142, success: 99.2, last: "2 min ago", icon: Search },
  { name: "Code Agent", role: "Code", status: "Active", tasks: 98, success: 97.8, last: "5 min ago", icon: Settings },
  { name: "Data Agent", role: "Data", status: "Idle", tasks: 203, success: 98.5, last: "1 hr ago", icon: Activity },
  { name: "Security Agent", role: "Security", status: "Active", tasks: 67, success: 99.9, last: "12 min ago", icon: CheckCircle2 },
  { name: "Writer Agent", role: "Writer", status: "Error", tasks: 54, success: 94.1, last: "3 hr ago", icon: FileText },
  { name: "Orchestrator", role: "Orchestration", status: "Active", tasks: 312, success: 99.5, last: "just now", icon: TrendingUp },
  { name: "Analytics Agent", role: "Analytics", status: "Idle", tasks: 89, success: 97.2, last: "45 min ago", icon: Activity },
  { name: "Automation Agent", role: "Automation", status: "Active", tasks: 120, success: 98.8, last: "8 min ago", icon: Settings },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-500/15 text-green-400",
  Idle: "bg-purple-500/15 text-purple-400",
  Error: "bg-red-500/15 text-red-400",
};

const kpis = [
  { title: "Total Agents", value: "12", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Active Now", value: "8", icon: Activity, color: "text-green-400", bg: "bg-green-500/10" },
  { title: "Tasks Completed", value: "1,342", icon: CheckCircle2, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Avg. Success Rate", value: "98.5%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

type SortKey = "name" | "role" | "status" | "tasks" | "success" | "last";

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let data = agents.filter((a) => {
      const matchesQuery =
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.role.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
    data = [...data].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "tasks" || sortKey === "success") {
        cmp = (a[sortKey] as number) - (b[sortKey] as number);
      } else {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [query, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Management</h1>
          <p className="text-sm text-gray-400">Monitor, configure, and orchestrate your AI workforce.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
          <Plus className="h-4 w-4" />
          Deploy Agent
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* KPI Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.title}
                className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${k.bg} ${k.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-xs text-gray-500">{k.title}</div>
                <div className="mt-1 text-2xl font-bold text-white">{k.value}</div>
              </div>
            );
          })}
        </div>

        {/* Table Card */}
        <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search agents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0B0F19] py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-700 bg-[#0B0F19] px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
                <option value="Error">Error</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-left text-gray-400">
                  {[
                    { key: "name", label: "Agent Name" },
                    { key: "role", label: "Role" },
                    { key: "status", label: "Status" },
                    { key: "tasks", label: "Tasks Completed" },
                    { key: "success", label: "Success Rate" },
                    { key: "last", label: "Last Active" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as SortKey)}
                      className="cursor-pointer select-none pb-3 pr-4 font-medium transition-colors hover:text-white"
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key as SortKey} />
                      </span>
                    </th>
                  ))}
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const Icon = a.icon;
                  return (
                    <tr
                      key={a.name}
                      className="border-b border-gray-800 transition-colors hover:bg-gray-800/50"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-white">{a.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-400">{a.role}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-gray-300">{a.tasks}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-800">
                            <div
                              className="h-full rounded-full bg-purple-500"
                              style={{ width: `${a.success}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{a.success}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-500">{a.last}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg border border-gray-800 bg-[#0B0F19] p-2 text-gray-400 transition-colors hover:text-white">
                            <Settings className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg border border-gray-800 bg-[#0B0F19] p-2 text-gray-400 transition-colors hover:text-white">
                            <FileText className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
