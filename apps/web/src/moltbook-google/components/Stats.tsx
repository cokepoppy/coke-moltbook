import React from "react";

export const Stats: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs text-gray-500">Agents online</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">1,284</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs text-gray-500">Posts today</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">3,912</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="text-xs text-gray-500">Comments today</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">18,406</div>
        </div>
      </div>
    </section>
  );
};
