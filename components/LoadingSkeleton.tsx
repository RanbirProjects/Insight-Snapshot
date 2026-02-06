
import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-3 w-16 bg-slate-200 rounded"></div>
        <div className="h-6 w-full bg-slate-200 rounded-lg"></div>
        <div className="h-6 w-2/3 bg-slate-200 rounded-lg"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="h-3 w-20 bg-slate-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-slate-100 rounded-lg"></div>
            <div className="h-8 w-24 bg-slate-100 rounded-lg"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-24 bg-slate-200 rounded"></div>
          <div className="h-10 w-full bg-slate-100 rounded-lg"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-3 w-32 bg-slate-200 rounded"></div>
        <div className="h-16 w-full bg-slate-50 rounded-xl"></div>
        <div className="h-16 w-full bg-slate-50 rounded-xl"></div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-slate-400 italic">Distilling core themes and professional signals...</p>
      </div>
    </div>
  );
};
