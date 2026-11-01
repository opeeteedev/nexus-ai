"use client";

import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import {
  Search,
  BarChart3,
  ShieldCheck,
  PenTool,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

type CustomNodeProps = {
  data: {
    label: string;
    sub: string;
    icon: React.ComponentType<{ className?: string }>;
  };
};

const CustomNode = ({ data }: CustomNodeProps) => {
  const Icon = data.icon;
  const highlight = data.label === "Data Quality Review";
  return (
    <div
      className={`bg-[#0F1523] border rounded-lg p-3 min-w-[150px] ${
        highlight
          ? "border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          : "border-gray-700"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-gray-500 !border-gray-600" />
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-purple-400" />
        <div>
          <div className="text-sm font-medium text-white">{data.label}</div>
          <div className="text-xs text-gray-400">{data.sub}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-500 !border-gray-600" />
    </div>
  );
};

export const nodeTypes: NodeTypes = { custom: CustomNode } as unknown as NodeTypes;

export const initialNodes = [
  { id: "web-search", type: "custom", position: { x: 0, y: 100 }, data: { label: "Web Search", sub: "Gather sources", icon: Search } },
  { id: "data-analysis", type: "custom", position: { x: 250, y: 100 }, data: { label: "Data Analysis", sub: "Process & extract", icon: BarChart3 } },
  { id: "data-quality", type: "custom", position: { x: 500, y: 100 }, data: { label: "Data Quality Review", sub: "Validate results", icon: ShieldCheck } },
  { id: "content-gen", type: "custom", position: { x: 750, y: 0 }, data: { label: "Content Generation", sub: "Draft output", icon: PenTool } },
  { id: "seo", type: "custom", position: { x: 750, y: 200 }, data: { label: "SEO Optimization", sub: "Optimize ranking", icon: TrendingUp } },
  { id: "re-search", type: "custom", position: { x: 250, y: 250 }, data: { label: "Re-search", sub: "Refine query", icon: RefreshCw } },
] as unknown as Node[];

export const initialEdges = [
  { id: "e1", source: "web-search", target: "data-analysis", type: "smoothstep", style: { stroke: "#4B5563", strokeWidth: 2 } },
  { id: "e2", source: "data-analysis", target: "data-quality", type: "smoothstep", style: { stroke: "#4B5563", strokeWidth: 2 } },
  { id: "e3", source: "data-quality", target: "content-gen", type: "smoothstep", label: "Pass", style: { stroke: "#4B5563", strokeWidth: 2 } },
  { id: "e4", source: "data-quality", target: "seo", type: "smoothstep", label: "Fail", style: { stroke: "#4B5563", strokeWidth: 2 } },
  { id: "e5", source: "data-quality", target: "re-search", type: "smoothstep", style: { stroke: "#4B5563", strokeWidth: 2 } },
  { id: "e6", source: "re-search", target: "data-analysis", type: "smoothstep", style: { stroke: "#4B5563", strokeWidth: 2 } },
] as unknown as Edge[];

export default function WorkflowPipeline() {
  return (
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
  );
}
