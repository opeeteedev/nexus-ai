"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Search, Plug, Database, MessageSquare, Cpu, Cloud, GitBranch, CreditCard } from "lucide-react";

const integrations = [
  { name: "Slack", desc: "Team messaging", category: "Communication", connected: true, icon: MessageSquare },
  { name: "PostgreSQL", desc: "Relational database", category: "Databases", connected: true, icon: Database },
  { name: "OpenAI", desc: "AI models", category: "AI Models", connected: false, icon: Cpu },
  { name: "AWS", desc: "Cloud infrastructure", category: "APIs", connected: true, icon: Cloud },
  { name: "GitHub", desc: "Source control", category: "APIs", connected: false, icon: GitBranch },
  { name: "Stripe", desc: "Payments", category: "APIs", connected: false, icon: CreditCard },
  { name: "MongoDB", desc: "NoSQL database", category: "Databases", connected: false, icon: Database },
  { name: "Anthropic", desc: "Claude models", category: "AI Models", connected: false, icon: Cpu },
];

const categories = ["All", "Databases", "APIs", "Communication", "AI Models"];

export default function IntegrationsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [connectedMap, setConnectedMap] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.name, i.connected]))
  );

  const filtered = integrations.filter((i) => {
    const matchesQuery = i.name.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === "All" || i.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <PageLayout>
      <header className="p-6">
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
        <p className="text-sm text-gray-400">Connect your favorite tools and data sources.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-[#0F1523] py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Plug className="h-4 w-4 text-gray-500" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-700 bg-[#0F1523] px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => {
            const Icon = i.icon;
            return (
              <div
                key={i.name}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-800 bg-[#0F1523] p-4 text-center transition-all duration-300 hover:border-gray-600"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-1 text-sm font-semibold text-white">{i.name}</div>
                <div className="mb-4 text-xs text-gray-500">{i.desc}</div>
                <button
                  onClick={() =>
                    setConnectedMap((prev) => ({ ...prev, [i.name]: !prev[i.name] }))
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    connectedMap[i.name]
                      ? "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                      : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                  }`}
                >
                  {connectedMap[i.name] ? "Connected" : "Connect"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
