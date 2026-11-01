import PageLayout from "@/components/PageLayout";
import { Plus, MoreHorizontal, Calendar, User } from "lucide-react";

const columns = [
  {
    title: "Pending",
    count: 12,
    tasks: [
      { title: "Analyze customer churn dataset", agent: "Data Agent", priority: "High", due: "Due today" },
      { title: "Generate API documentation", agent: "Writer Agent", priority: "Medium", due: "Due tomorrow" },
      { title: "Audit access logs", agent: "Security Agent", priority: "Low", due: "Due in 3 days" },
      { title: "Collect training data", agent: "Research Agent", priority: "Medium", due: "Due in 5 days" },
    ],
  },
  {
    title: "In Progress",
    count: 8,
    tasks: [
      { title: "Scan dependencies for CVEs", agent: "Security Agent", priority: "High", due: "Due today" },
      { title: "Refactor auth middleware", agent: "Code Agent", priority: "Low", due: "Due in 2 days" },
      { title: "Build search index", agent: "Data Agent", priority: "Medium", due: "Due tomorrow" },
    ],
  },
  {
    title: "Completed",
    count: 342,
    tasks: [
      { title: "Optimize DB queries", agent: "Data Agent", priority: "Low", due: "Completed" },
      { title: "Publish Q3 report", agent: "Writer Agent", priority: "Medium", due: "Completed" },
      { title: "Deploy staging env", agent: "Code Agent", priority: "High", due: "Completed" },
      { title: "Index knowledge base", agent: "Research Agent", priority: "Medium", due: "Completed" },
    ],
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function TasksPage() {
  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          <p className="text-sm text-gray-400">Organize and track your AI agent workloads.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-[#0F1523] p-4 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">{col.title}</h2>
                <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-300">
                  {col.title} ({col.count})
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {col.tasks.map((t, i) => (
                  <div
                    key={i}
                    className="group cursor-grab rounded-lg border border-gray-800/60 bg-[#0B0F19]/50 p-3 transition-all duration-300 hover:scale-105 hover:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-white">{t.title}</div>
                      <button className="opacity-0 transition-opacity group-hover:opacity-100 text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-xs text-purple-300">
                        <User className="h-3 w-3" />
                        {t.agent}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityStyles[t.priority]}`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {t.due}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
