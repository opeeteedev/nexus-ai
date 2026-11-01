"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Download, Search, Terminal } from "lucide-react";

const logs = [
  { time: "2026-11-01 10:24:15", level: "Info", agent: "Research Agent", message: "Completed web search for 'AI trends 2026'" },
  { time: "2026-11-01 10:24:32", level: "Info", agent: "Code Agent", message: "Merged pull request #42 into main" },
  { time: "2026-11-01 10:25:01", level: "Warning", agent: "Security Agent", message: "Dependency vulnerability detected in package X" },
  { time: "2026-11-01 10:25:18", level: "Info", agent: "Data Agent", message: "ETL pipeline processed 12,430 records" },
  { time: "2026-11-01 10:25:45", level: "Error", agent: "Orchestrator", message: "Workflow 'Data Ingestion' failed at step 3" },
  { time: "2026-11-01 10:26:10", level: "Info", agent: "Research Agent", message: "Indexed 15 new documents" },
  { time: "2026-11-01 10:26:33", level: "Warning", agent: "Data Agent", message: "High memory usage detected during processing" },
  { time: "2026-11-01 10:27:02", level: "Info", agent: "Writer Agent", message: "Published quarterly report" },
];

const levelStyles: Record<string, string> = {
  Info: "text-blue-400",
  Warning: "text-yellow-400",
  Error: "text-red-400",
};

export default function LogsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");

  const filtered = logs.filter((l) => {
    const matchesQuery =
      l.message.toLowerCase().includes(query.toLowerCase()) ||
      l.agent.toLowerCase().includes(query.toLowerCase());
    const matchesSev = severity === "All" || l.level === severity;
    return matchesQuery && matchesSev;
  });

  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">System Logs</h1>
          <p className="text-sm text-gray-400">Real-time audit trail of all AI agent actions.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-800 bg-[#0F1523] px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          <Download className="h-4 w-4" />
          Download Logs
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search logs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-[#0F1523] py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-500" />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="rounded-lg border border-gray-700 bg-[#0F1523] px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
            >
              <option value="All">All</option>
              <option value="Info">Info</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#0B0F19] p-4 font-mono text-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-gray-500">
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">Level</th>
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={i} className="border-b border-gray-800 transition-colors hover:bg-gray-800/50">
                  <td className="py-2 text-gray-500">{l.time}</td>
                  <td className={`py-2 font-semibold ${levelStyles[l.level]}`}>{l.level}</td>
                  <td className="py-2 text-purple-300">{l.agent}</td>
                  <td className="py-2 text-gray-300">{l.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}
