import React from "react";

const colorMap: Record<string, string> = {
  "bg-purple-500/10": "text-purple-400",
  "bg-blue-500/10": "text-blue-400",
  "bg-yellow-500/10": "text-yellow-400",
  "bg-pink-500/10": "text-pink-400",
  "bg-green-500/10": "text-green-400",
  "bg-red-500/10": "text-red-400",
};

export default function AgentIcon({
  icon: Icon,
  bgColor,
  borderColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
}) {
  const textColor = colorMap[bgColor] ?? "text-white";
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${bgColor} ${borderColor} transition-transform hover:scale-110 ${textColor}`}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}
