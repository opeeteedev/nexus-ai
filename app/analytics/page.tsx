"use client";

import PageLayout from "@/components/PageLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Zap, Clock, Activity } from "lucide-react";

const lineData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  tasks: Math.round(100 + Math.sin(i / 3) * 40 + Math.random() * 20),
}));

const barData = [
  { name: "Research", tasks: 320 },
  { name: "Code", tasks: 280 },
  { name: "Data", tasks: 210 },
  { name: "Security", tasks: 150 },
  { name: "Writer", tasks: 190 },
];

const activity = [
  { time: "10:24:15", agent: "Research Agent", action: "Completed web search", status: "Success" },
  { time: "10:24:32", agent: "Code Agent", action: "Merged pull request", status: "Success" },
  { time: "10:25:01", agent: "Security Agent", action: "Flagged vulnerability", status: "Warning" },
  { time: "10:25:18", agent: "Data Agent", action: "Finished ETL pipeline", status: "Success" },
  { time: "10:25:45", agent: "Orchestrator", action: "Rebalanced queue", status: "Success" },
];

const kpis = [
  { title: "Total Tasks", value: "12,450", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Avg. Latency", value: "1.2s", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Token Usage", value: "2.4M", icon: Zap, color: "text-green-400", bg: "bg-green-500/10" },
];

const statusStyles: Record<string, string> = {
  Success: "bg-green-500/15 text-green-400",
  Warning: "bg-yellow-500/15 text-yellow-400",
  Error: "bg-red-500/15 text-red-400",
};

export default function AnalyticsPage() {
  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-400">Deep insights into your AI agent performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select className="rounded-lg border border-gray-700 bg-[#0F1523] px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* KPI Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

        {/* Charts */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
            <h2 className="mb-4 text-sm font-semibold text-white">Tasks Completed Over Time</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#0F1523", border: "1px solid #1F2937", color: "#E5E7EB" }} />
                  <Line type="monotone" dataKey="tasks" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
            <h2 className="mb-4 text-sm font-semibold text-white">Agent Performance by Type</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#0F1523", border: "1px solid #1F2937", color: "#E5E7EB" }} />
                  <Bar dataKey="tasks" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
          <h2 className="mb-4 text-sm font-semibold text-white">Recent Activity</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-gray-400">
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((a, i) => (
                <tr key={i} className="border-b border-gray-800 transition-colors hover:bg-gray-800/50">
                  <td className="py-3 text-gray-500">{a.time}</td>
                  <td className="py-3 text-white">{a.agent}</td>
                  <td className="py-3 text-gray-400">{a.action}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
