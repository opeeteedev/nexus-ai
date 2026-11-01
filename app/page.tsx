"use client";

import { useState } from "react";
import { Area, AreaChart } from "recharts";
import { ReactFlow, ReactFlowProvider } from "@xyflow/react";
import { initialNodes, initialEdges, nodeTypes } from "@/components/WorkflowPipeline";
import { Background } from "@xyflow/react";
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
  Bell,
  Plus,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Rocket,
  Search,
  Code2,
  Database,
  Shield,
  PenTool,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Agents", icon: Users, active: false },
  { label: "Tasks", icon: CheckSquare, active: false },
  { label: "Workflows", icon: Workflow, active: false },
  { label: "Knowledge Base", icon: BookOpen, active: false },
  { label: "Integrations", icon: Plug, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Logs", icon: FileText, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const metrics = [
  {
    title: "Active Agents",
    value: "12",
    delta: "+3.2%",
    positive: true,
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Tasks in Progress",
    value: "47",
    delta: "+8.1%",
    positive: true,
    icon: CheckSquare,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Tasks Completed",
    value: "342",
    delta: "+12.4%",
    positive: true,
    icon: CheckSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Success Rate",
    value: "98.5%",
    delta: "+0.3%",
    positive: true,
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Total Cost",
    value: "$47.32",
    delta: "-2.1%",
    positive: false,
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const agents = [
  {
    name: "Research Agent",
    sub: "Information Gathering",
    status: "Active",
    done: 12,
    total: 15,
    color: "#8B5CF6",
    icon: Search,
    data: [3, 5, 4, 7, 6, 8, 7, 9, 8, 10],
  },
  {
    name: "Code Agent",
    sub: "Code Generation",
    status: "Active",
    done: 8,
    total: 10,
    color: "#3B82F6",
    icon: Code2,
    data: [2, 4, 3, 6, 5, 7, 6, 8, 7, 9],
  },
  {
    name: "Data Agent",
    sub: "Data Processing",
    status: "Idle",
    done: 20,
    total: 20,
    color: "#10B981",
    icon: Database,
    data: [5, 6, 5, 7, 6, 8, 7, 7, 8, 8],
  },
  {
    name: "Security Agent",
    sub: "Threat Analysis",
    status: "Active",
    done: 4,
    total: 6,
    color: "#F59E0B",
    icon: Shield,
    data: [1, 2, 2, 3, 4, 3, 5, 4, 6, 5],
  },
  {
    name: "Writer Agent",
    sub: "Content Creation",
    status: "Idle",
    done: 15,
    total: 15,
    color: "#EC4899",
    icon: PenTool,
    data: [4, 5, 6, 5, 7, 6, 8, 7, 8, 9],
  },
  {
    name: "Orchestrator",
    sub: "Task Coordination",
    status: "Active",
    done: 30,
    total: 34,
    color: "#06B6D4",
    icon: Bot,
    data: [6, 7, 8, 7, 9, 8, 10, 9, 11, 10],
  },
];

const activityFeed = [
  { icon: Search, color: "text-blue-400", bg: "bg-blue-500/10", text: "Research Agent completed a web search", time: "2 sec ago" },
  { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", text: "Security Agent flagged a vulnerability", time: "12 sec ago" },
  { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10", text: "Code Agent merged a pull request", time: "24 sec ago" },
  { icon: Database, color: "text-blue-400", bg: "bg-blue-500/10", text: "Data Agent finished ETL pipeline", time: "1 min ago" },
  { icon: PenTool, color: "text-green-400", bg: "bg-green-500/10", text: "Writer Agent published a report", time: "2 min ago" },
  { icon: Bot, color: "text-purple-400", bg: "bg-purple-500/10", text: "Orchestrator rebalanced task queue", time: "3 min ago" },
];

const tasks = [
  { title: "Analyze customer churn dataset", priority: "High", agent: "Data Agent", due: "Due today" },
  { title: "Generate API documentation", priority: "Medium", agent: "Writer Agent", due: "Due tomorrow" },
  { title: "Scan dependencies for CVEs", priority: "High", agent: "Security Agent", due: "Due today" },
  { title: "Refactor auth middleware", priority: "Low", agent: "Code Agent", due: "Due in 3 days" },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function Home() {
  const [tab, setTab] = useState("In Progress");

  return (
    <div className="flex h-screen bg-[#0B0F19] text-gray-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-gray-800 bg-[#0B0F19]">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400">
            <Rocket className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white">NEXUS</span>
            <span className="text-xs text-gray-500">AI Orchestration</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href="#"
                    className={
                      item.active
                        ? "flex items-center gap-3 rounded-lg bg-purple-600/15 px-3 py-2 text-sm font-medium text-purple-300"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-gray-800/50 hover:text-white"
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* System Status */}
        <div className="border-t border-gray-800 p-4">
          <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
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
            <button className="mt-4 w-full rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500">
              Upgrade Plan
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Agent Orchestration</h1>
            <p className="text-sm text-gray-500">
              Monitor and manage your AI agents in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500">
              <Plus className="h-4 w-4" />
              Create Agent
            </button>
            <button className="rounded-lg border border-gray-800 bg-[#0F1523] p-2 text-gray-400 transition-colors hover:text-white">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-gray-800 bg-[#0F1523] px-3 py-2 text-sm text-gray-300 transition-colors hover:text-white">
              Production
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {metrics.map((m) => {
              const Icon = m.icon;
              const DeltaIcon = m.positive ? TrendingUp : TrendingDown;
              return (
                <div
                  key={m.title}
                  className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.bg} ${m.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        m.positive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <DeltaIcon className="h-3.5 w-3.5" />
                      {m.delta}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{m.title}</div>
                  <div className="mt-1 text-2xl font-bold text-white">{m.value}</div>
                </div>
              );
            })}
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Agent Swarm Status */}
            <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Agent Swarm Status</h2>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300">
                  View All Agents
                </a>
              </div>
              <div className="flex flex-col gap-3">
                {agents.map((a) => {
                  const Icon = a.icon;
                  const pct = Math.round((a.done / a.total) * 100);
                  return (
                    <div
                      key={a.name}
                      className="flex items-center gap-4 rounded-lg border border-gray-800/60 bg-[#0B0F19]/50 p-3"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${a.color}20`, color: a.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-white">{a.name}</div>
                            <div className="text-xs text-gray-500">{a.sub}</div>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              a.status === "Active"
                                ? "bg-green-500/15 text-green-400"
                                : "bg-purple-500/15 text-purple-400"
                            }`}
                          >
                            {a.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                              <span>{a.done}/{a.total} tasks</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                              <div
                                className="h-full rounded-full bg-blue-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                          <div className="shrink-0">
                            <AreaChart width={100} height={40} data={a.data.map((v, i) => ({ v, i }))}>
                              <defs>
                                <linearGradient id={`grad-${a.name}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={a.color} stopOpacity={0.4} />
                                  <stop offset="100%" stopColor={a.color} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <Area
                                type="monotone"
                                dataKey="v"
                                stroke={a.color}
                                strokeWidth={2}
                                fill={`url(#grad-${a.name})`}
                                isAnimationActive={false}
                              />
                            </AreaChart>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3 stacked */}
            <div className="flex flex-col gap-6">
              {/* Live Activity Feed */}
              <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
                <h2 className="mb-4 text-sm font-semibold text-white">Live Activity Feed</h2>
                <ul className="flex flex-col gap-1">
                  {activityFeed.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-800/30"
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-gray-300">{item.text}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Task Queue */}
              <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
                <h2 className="mb-4 text-sm font-semibold text-white">Task Queue</h2>
                <div className="mb-4 flex gap-2">
                  {[
                    { label: "Pending", count: 23 },
                    { label: "In Progress", count: 47 },
                    { label: "Completed", count: 342 },
                  ].map((t) => (
                    <button
                      key={t.label}
                      onClick={() => setTab(t.label)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        tab === t.label
                          ? "bg-purple-600/20 text-purple-300"
                          : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      {t.label}
                      <span className="rounded-full bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-300">
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {tasks.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-800/60 bg-[#0B0F19]/50 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-medium text-white">{t.title}</div>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityStyles[t.priority]}`}
                        >
                          {t.priority}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                        <span>{t.agent}</span>
                        <span>{t.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-800 bg-[#0B0F19] px-3 py-2 text-sm text-gray-300 transition-colors hover:text-white">
                  View All Tasks
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Workflow Pipeline */}
          <div className="bg-[#0F1523] border border-gray-800 rounded-xl p-4 mb-6 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
            <h2 className="text-sm font-bold text-white mb-4">Workflow Pipeline</h2>
            <div className="w-full h-[400px] overflow-hidden rounded-lg">
              <ReactFlowProvider>
                <ReactFlow
                  nodes={initialNodes}
                  edges={initialEdges}
                  nodeTypes={nodeTypes}
                  fitView
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background color="#333" gap={16} size={1} />
                </ReactFlow>
              </ReactFlowProvider>
            </div>
          </div>

          {/* Agent Communication Log */}
          <div className="bg-[#0F1523] border border-gray-800 rounded-xl p-4 flex flex-col h-[400px] transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-white">Agent Communication Log</h2>
              <div className="flex gap-2">
                <select className="bg-[#0B0F19] text-gray-300 text-xs border border-gray-700 rounded p-1">
                  <option>All Agents</option>
                </select>
                <select className="bg-[#0B0F19] text-gray-300 text-xs border border-gray-700 rounded p-1">
                  <option>All Levels</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3">
              {[
                { agent: "Research Agent", time: "10:24:15", text: "I found 15 new sources for the AI trends topic.", icon: Search, color: "text-purple-500" },
                { agent: "Code Agent", time: "10:24:32", text: "Refactored authentication middleware successfully.", icon: Code2, color: "text-blue-500" },
                { agent: "Security Agent", time: "10:25:01", text: "Detected 2 potential vulnerabilities in dependencies.", icon: Shield, color: "text-red-500" },
                { agent: "Data Agent", time: "10:25:18", text: "ETL pipeline completed: 12,430 records processed.", icon: Database, color: "text-green-500" },
                { agent: "Orchestrator", time: "10:25:45", text: "Task queue rebalanced across 6 agents.", icon: Bot, color: "text-cyan-500" },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="flex items-start gap-3 text-sm border-b border-gray-800/50 pb-3">
                    <Icon className={`w-4 h-4 ${m.color} mt-1`} />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-white">{m.agent}</span>
                        <span className="text-xs text-gray-500">{m.time}</span>
                      </div>
                      <p className="text-gray-400 mt-1">{m.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[#0B0F19] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              />
              <button className="rounded-lg bg-purple-600 p-3 text-white transition-colors hover:bg-purple-500">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
