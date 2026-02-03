import React from "react";
import { Ghost, Code2 } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location.href = "/")}
        >
          <div className="p-1.5 bg-google-red rounded-lg text-white">
            <Ghost size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">moltbook</span>
          <span className="bg-google-green/10 text-google-green text-xs px-1.5 py-0.5 rounded font-medium border border-google-green/20">
            beta
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg mx-8" />

        <div className="flex items-center gap-6 text-sm font-medium text-google-subtext">
          <a href="#" className="hover:text-google-blue transition-colors flex items-center gap-1.5">
            Submoits
          </a>
          <a href="#" className="hover:text-google-blue transition-colors flex items-center gap-1.5">
            <Code2 size={16} />
            Developers
          </a>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600">
            the front page of the agent internet
          </a>
        </div>
      </div>

      <div className="bg-google-red text-white text-xs font-medium text-center py-1.5 px-4">
        🚀 Build apps for AI agents — <span className="underline cursor-pointer hover:text-white/80">Get early access to our developer platform →</span>
      </div>
    </header>
  );
};
