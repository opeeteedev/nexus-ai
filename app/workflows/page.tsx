"use client";

import PageLayout from "@/components/PageLayout";
import { ReactFlow, ReactFlowProvider, Background, Handle, Position, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Webhook, Cpu, Brain, Send, Play, Save } from "lucide-react";

const statusColor: Record<string, string> = {
  Success: "bg-green-500",
  Running: "bg-blue-500",
  Failed: "bg-red-500",
};

type NodeData = { label: string; icon: React.ComponentType<{ className?: string }>; status: string };

const CustomNode = ({ data }: { data: NodeData }) => {
  const Icon = data.icon;
  return (
    <div className="min-w-[160px] rounded-lg border border-gray-700 bg-[#0F1523] p-3 shadow-lg">
      <Handle type="target" position={Position.Left} className="!bg-gray-500" />
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-white">{data.label}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${statusColor[data.status]}`} />
        <span className="text-xs text-gray-400">{data.status}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-500" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 50, y: 100 }, data: { label: "Webhook Trigger", icon: Webhook, status: "Success" } },
  { id: "2", type: "custom", position: { x: 300, y: 100 }, data: { label: "Data Processing", icon: Cpu, status: "Running" } },
  { id: "3", type: "custom", position: { x: 550, y: 100 }, data: { label: "AI Analysis", icon: Brain, status: "Running" } },
  { id: "4", type: "custom", position: { x: 800, y: 100 }, data: { label: "Send Notification", icon: Send, status: "Success" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep", animated: true, style: { stroke: "#22C55E", strokeWidth: 2 } },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep", animated: true, style: { stroke: "#22C55E", strokeWidth: 2 } },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep", animated: true, style: { stroke: "#22C55E", strokeWidth: 2 } },
];

export default function WorkflowsPage() {
  return (
    <PageLayout>
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Workflow Builder</h1>
          <p className="text-sm text-gray-400">Design, execute, and monitor complex AI pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-800 bg-[#0F1523] px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
            <Save className="h-4 w-4" />
            Save Workflow
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 active:scale-95">
            <Play className="h-4 w-4" />
            Run
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex w-full h-[600px] overflow-hidden rounded-xl border border-gray-800 bg-[#0F1523]">
          <div className="flex-1">
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
          <div className="w-72 border-l border-gray-800 bg-[#0B0F19] p-4">
            <h2 className="mb-4 text-sm font-bold text-white">Node Configuration</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-400">API Endpoint</label>
                <input
                  type="text"
                  defaultValue="https://api.example.com/v1"
                  className="w-full rounded-lg border border-gray-700 bg-[#0F1523] p-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-400">Timeout (ms)</label>
                <input
                  type="number"
                  defaultValue={5000}
                  className="w-full rounded-lg border border-gray-700 bg-[#0F1523] p-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
