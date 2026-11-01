"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Upload, Search, Eye, Trash2, FileText, Database, Clock } from "lucide-react";

const docs = [
  { name: "API Documentation", type: "PDF", size: "2.4 MB", status: "Indexed" },
  { name: "Customer Churn Data", type: "CSV", size: "8.1 MB", status: "Indexed" },
  { name: "Product Catalog", type: "Web", size: "1.2 MB", status: "Processing" },
  { name: "Prompt Guidelines", type: "PDF", size: "1.1 MB", status: "Indexed" },
  { name: "Support Tickets 2026", type: "CSV", size: "12.3 MB", status: "Processing" },
  { name: "Employee Handbook", type: "PDF", size: "3.5 MB", status: "Indexed" },
];

const kpis = [
  { title: "Total Documents", value: "1,248", icon: FileText, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Vector Embeddings", value: "4.2M", icon: Database, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Last Sync", value: "2 mins ago", icon: Clock, color: "text-green-400", bg: "bg-green-500/10" },
];

export default function KnowledgeBasePage() {
  const [query, setQuery] = useState("");

  const filtered = docs.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
          <p className="text-sm text-gray-400">Manage the proprietary data powering your AI agents.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Documents Table */}
          <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Documents</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-[#0B0F19] py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-gray-400">
                    <th className="pb-3 font-medium">Document Name</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Size</th>
                    <th className="pb-3 font-medium">Indexed Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.name} className="border-b border-gray-800 transition-colors hover:bg-gray-800/50">
                      <td className="py-3 font-medium text-white">{d.name}</td>
                      <td className="py-3 text-gray-400">{d.type}</td>
                      <td className="py-3 text-gray-400">{d.size}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            d.status === "Indexed"
                              ? "bg-green-500/15 text-green-400"
                              : "bg-yellow-500/15 text-yellow-400"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg border border-gray-800 bg-[#0B0F19] p-2 text-gray-400 transition-colors hover:text-white">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg border border-gray-800 bg-[#0B0F19] p-2 text-gray-400 transition-colors hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RAG Config */}
          <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10">
            <h2 className="mb-4 text-sm font-semibold text-white">RAG Configuration</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-400">Embedding Model</label>
                <select className="w-full rounded-lg border border-gray-700 bg-[#0B0F19] p-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
                  <option>text-embedding-3-large</option>
                  <option>text-embedding-3-small</option>
                  <option>all-MiniLM-L6-v2</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Enable Hybrid Search</span>
                <button className="relative h-6 w-11 rounded-full bg-purple-600 transition-colors">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
