"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { User, Shield, CreditCard, Key, Save, Plus } from "lucide-react";

const tabs = [
  { id: "Profile", icon: User },
  { id: "Security", icon: Shield },
  { id: "Billing", icon: CreditCard },
  { id: "API Keys", icon: Key },
];

const apiKeys = [
  { name: "Production Key", key: "sk-prod-••••••••abcd", created: "Oct 12, 2026" },
  { name: "Staging Key", key: "sk-stg-••••••••efgh", created: "Oct 20, 2026" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");

  return (
    <PageLayout>
      <header className="p-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-400">Manage your organization and account preferences.</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-6 flex gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "bg-purple-600 text-white"
                    : "border border-gray-800 bg-[#0F1523] text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.id}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#0F1523] p-6">
          {tab === "Profile" && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Organization Name</label>
                <input
                  type="text"
                  defaultValue="NEXUS AI"
                  className="w-full max-w-md rounded-lg border border-gray-700 bg-[#0B0F19] p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Admin Email</label>
                <input
                  type="email"
                  defaultValue="admin@nexus.ai"
                  className="w-full max-w-md rounded-lg border border-gray-700 bg-[#0B0F19] p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Timezone</label>
                <select className="w-full max-w-md rounded-lg border border-gray-700 bg-[#0B0F19] p-3 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </div>
              <button onClick={() => alert("Settings saved!")} className="flex w-fit items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {tab === "Security" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                  <div className="text-xs text-gray-500">Require 2FA for all users</div>
                </div>
                <button className="relative h-6 w-11 rounded-full bg-purple-600 transition-colors">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">Session Timeout</div>
                  <div className="text-xs text-gray-500">Auto-logout after inactivity</div>
                </div>
                <select className="rounded-lg border border-gray-700 bg-[#0B0F19] px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
                  <option>30 min</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                </select>
              </div>
            </div>
          )}

          {tab === "Billing" && (
            <div className="flex flex-col gap-4">
              <div className="text-sm text-gray-300">Current Plan: <span className="font-semibold text-white">Pro</span></div>
              <div className="text-xs text-gray-500">Next billing date: Dec 1, 2026</div>
              <button className="w-fit rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
                Upgrade Plan
              </button>
            </div>
          )}

          {tab === "API Keys" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
                  <Plus className="h-4 w-4" />
                  Create New Key
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-gray-400">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Key</th>
                    <th className="pb-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((k) => (
                    <tr key={k.name} className="border-b border-gray-800">
                      <td className="py-3 text-white">{k.name}</td>
                      <td className="py-3 font-mono text-gray-400">{k.key}</td>
                      <td className="py-3 text-gray-500">{k.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
