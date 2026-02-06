
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Insight Snapshot</h1>
          <p className="text-lg text-slate-500">Professional clarity for your work reflections.</p>
        </header>
        <main>
          {children}
        </main>
        <footer className="text-center pt-12 pb-6">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Insight Snapshot. Powered by AI for high-performance professionals.</p>
        </footer>
      </div>
    </div>
  );
};
