
import React from 'react';
import { InsightResult } from '../types';

interface InsightDisplayProps {
  insight: InsightResult;
  onReset: () => void;
}

export const InsightDisplay: React.FC<InsightDisplayProps> = ({ insight, onReset }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {/* Header/Summary Section */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Summary</span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Snapshot generated
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-800 leading-tight">
            {insight.summary}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">
          {/* Signal & Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Key Themes</h3>
              <div className="flex flex-wrap gap-2">
                {insight.themes.map((theme, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {theme}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Emotional Signal</h3>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-indigo-900">{insight.signal}</span>
              </div>
            </section>
          </div>

          {/* Prompts */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Reflection Prompts</h3>
            <div className="space-y-3">
              {insight.prompts.map((prompt, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-600 transition-colors">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed italic">"{prompt}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* Optional Risk Note */}
          {insight.risk && (
            <section className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xs uppercase tracking-widest font-bold text-amber-700">Potential Risk Note</h3>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                {insight.risk}
              </p>
            </section>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 text-slate-500 hover:text-indigo-600 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Write another reflection
      </button>
    </div>
  );
};
