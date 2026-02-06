
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ReflectionForm } from './components/ReflectionForm';
import { InsightDisplay } from './components/InsightDisplay';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { generateInsight } from './services/gemini';
import { InsightResult, AppState } from './types';

const DEMO_INSIGHTS: Record<string, InsightResult> = {
  "Conflict": {
    summary: "Friction between technical debt management and aggressive feature deadlines.",
    themes: ["Social Capital", "Stakeholder Alignment", "Role Ambiguity"],
    signal: "Frustrated / High Accountability",
    prompts: [
      "If the deadline shifted by 2 weeks, how would that change your technical approach?",
      "What data point would make your manager see the 'invisible' cost of this technical debt?"
    ],
    risk: "Potential for burnout due to 'savior complex'—trying to fix everything alone without structural support."
  },
  "Decision": {
    summary: "Strategic trade-off prioritizing long-term platform stability over immediate feature parity.",
    themes: ["Strategic Prioritization", "Market Positioning", "Product Quality"],
    signal: "Calculated / Cautious",
    prompts: [
      "What is the single biggest risk of NOT launching this feature today?",
      "How are you communicating the 'quality win' to the sales team to mitigate their frustration?"
    ],
    risk: "Risk of over-polishing. Ensure the stability gains are measurable, not just theoretical."
  },
  "Pressure": {
    summary: "Resource constraints forcing a shift from 'Execution' to 'Triage' mode.",
    themes: ["Capacity Planning", "Operational Resilience", "Leadership Communication"],
    signal: "Overwhelmed / Pragmatic",
    prompts: [
      "Which 20% of your current tasks are generating 80% of the perceived pressure?",
      "Who can you deputize today to handle the low-context communications?"
    ],
    risk: "Impulsivity in delegation. Don't offload tasks without clear success criteria just to clear your plate."
  }
};

function App() {
  const [state, setState] = useState<AppState>('idle');
  const [insight, setInsight] = useState<InsightResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    setState('loading');
    setError(null);
    try {
      const result = await generateInsight(text);
      setInsight(result);
      setState('success');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Something went wrong. Please try again.');
      setState('error');
    }
  };

  const handleShowDemo = (type: string) => {
    setInsight(DEMO_INSIGHTS[type]);
    setState('success');
    setError(null);
  };

  const handleReset = () => {
    setState('idle');
    setInsight(null);
    setError(null);
  };

  return (
    <Layout>
      {state === 'idle' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-indigo-900">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              How it works
            </h2>
            <p className="text-sm leading-relaxed opacity-90">
              Insight Snapshot analyzes your work experiences to help you identify patterns and clarify your perspective. No fluff, just objective feedback.
            </p>
          </section>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest">Live Reflection</h3>
            </div>
            <ReflectionForm onSubmit={handleSubmit} isLoading={false} />
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest text-center">Or View a Demo (No API Key Required)</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(DEMO_INSIGHTS).map(type => (
                <button
                  key={type}
                  onClick={() => handleShowDemo(type)}
                  className="py-3 px-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm flex flex-col items-center gap-2"
                >
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-500">
                    {type === 'Conflict' && '⚔️'}
                    {type === 'Decision' && '⚖️'}
                    {type === 'Pressure' && '🔥'}
                  </span>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {state === 'loading' && <LoadingSkeleton />}

      {state === 'success' && insight && (
        <InsightDisplay insight={insight} onReset={handleReset} />
      )}

      {state === 'error' && (
        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Analysis Failed</h3>
            <p className="text-slate-500">{error}</p>
          </div>
          <div className="pt-4 space-y-3">
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg"
            >
              Back to Input
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">or try demo</span></div>
            </div>
            <button
              onClick={() => handleShowDemo('Conflict')}
              className="w-full py-3 px-6 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
            >
              See Example Snapshot
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
