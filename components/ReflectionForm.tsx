
import React from 'react';

interface ReflectionFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  {
    label: "Team Conflict",
    text: "During the roadmap meeting, a peer challenged my project timeline in front of the VP. I felt defensive and shut down the conversation abruptly instead of engaging with their data. Now there's tension in our 1:1s."
  },
  {
    label: "Hard Decision",
    text: "I decided to cut a highly requested feature to ensure the core platform remains stable for our enterprise launch. Half the team is relieved, but the sales team is frustrated and I'm second-guessing the trade-off."
  },
  {
    label: "Under Pressure",
    text: "I've been asked to take over a failing project while maintaining my current workload. I'm struggling to delegate tasks effectively and find myself working late into the night just to keep up with basic comms."
  }
];

export const ReflectionForm: React.FC<ReflectionFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) return;
    onSubmit(text);
  };

  const handleExampleClick = (exampleText: string) => {
    setText(exampleText);
  };

  const isInvalid = text.trim().length < 10;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="reflection" className="block text-sm font-semibold text-slate-700">
              Reflection Input
            </label>
            <div className="flex flex-wrap gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 self-center mr-1">Quick Start:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => handleExampleClick(ex.text)}
                  className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 hover:bg-indigo-600 hover:text-white rounded-md transition-all border border-slate-200"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            id="reflection"
            rows={5}
            className="w-full block p-4 text-slate-900 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder:text-slate-400"
            placeholder="Describe a workplace situation you're processing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center px-1">
            <p className="text-xs text-slate-400 font-medium">
              {text.length > 0 ? `${text.length} characters` : 'Min 10 characters required'}
            </p>
            <p className="text-xs text-slate-400">Your reflection is private.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || isInvalid}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-md transform hover:scale-[1.01] active:scale-95 ${
            isLoading || isInvalid 
              ? 'bg-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Distilling Insights...
            </span>
          ) : (
            'Generate Snapshot'
          )}
        </button>
      </form>
    </div>
  );
};
