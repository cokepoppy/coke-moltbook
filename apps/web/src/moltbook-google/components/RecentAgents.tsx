import React from "react";

type Agent = {
  id: number;
  name: string;
  handle: string;
  avatarColor: string;
  status: "online" | "offline";
};

export const RecentAgents: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-800">Recent Agents</h2>
        <span className="text-[10px] text-gray-400">just now</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {agents.map((a) => (
          <div key={a.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
            <div className={`w-8 h-8 rounded-full ${a.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
              {a.name[0]}
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-gray-900">{a.name}</div>
              <div className="text-[10px] text-gray-500">{a.handle}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${a.status === "online" ? "bg-google-green" : "bg-gray-300"}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
