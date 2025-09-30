import React, { useState } from 'react';
import { ApiData } from '../types/api';

interface DemoListProps {
  apiData: ApiData;
  onRunById: (id: string, bringToFront?: boolean) => Promise<void>;
}

export const DemoList: React.FC<DemoListProps> = ({ apiData, onRunById }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [bringToFront, setBringToFront] = useState(true);

  const handleRunDemo = async (id: string, title: string) => {
    try {
      setLoading(id);
      await onRunById(id, bringToFront);
    } catch (error) {
      console.error('Failed to run demo:', error);
      alert(`Failed to run "${title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  const currentlyExecuted = new Set(
    apiData.currentDemoFile?.demo.map(d => d.id).filter(Boolean) || []
  );

  const isCurrentlyExecuted = (demoId: string) => currentlyExecuted.has(demoId);
  const isNextDemo = (demoId: string) => apiData.nextDemo?.id === demoId;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          All Demos
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            id="bringToFrontList"
            checked={bringToFront}
            onChange={(e) => setBringToFront(e.target.checked)}
            className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="bringToFrontList" className="text-gray-300 font-medium">
            Bring to front
          </label>
        </div>
      </div>

      {apiData.demoFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-400 text-lg">No demo files found</p>
          <p className="text-sm text-gray-500 mt-2">
            Load a demo file in Demo Time to see demos here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {apiData.demoFiles.map((demoFile, fileIndex) => (
            <div key={fileIndex} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4">
              <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                <span className="text-[#FFD23F]">📄</span>
                {demoFile.filePath.split('/').pop() || demoFile.filePath}
              </h3>

              {demoFile.demos.length === 0 ? (
                <p className="text-gray-400 text-sm italic">No demos in this file</p>
              ) : (
                <div className="space-y-3">
                  {demoFile.demos.map((demo, demoIndex) => {
                    const isExecuted = isCurrentlyExecuted(demo.id);
                    const isNext = isNextDemo(demo.id);
                    const isLoading = loading === demo.id;

                    return (
                      <div
                        key={demoIndex}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${isNext
                            ? 'bg-[#FFD23F]/10 border-[#FFD23F]/40 shadow-lg'
                            : isExecuted
                              ? 'bg-green-900/20 border-green-600/40'
                              : 'bg-gray-700/30 border-gray-600/40 hover:bg-gray-700/50'
                          }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            {isNext && (
                              <span className="status-connected text-xs px-3 py-1 flex items-center gap-1">
                                <span className="animate-pulse">●</span>
                                NEXT
                              </span>
                            )}
                            {isExecuted && (
                              <span className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs px-3 py-1 rounded-full font-medium">
                                ✓ Done
                              </span>
                            )}
                            <span className="font-semibold text-white truncate">
                              {demo.title}
                            </span>
                          </div>
                          {demo.id && (
                            <p className="text-xs text-blue-300 mt-2 font-mono">
                              ID: {demo.id}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleRunDemo(demo.id, demo.title)}
                          disabled={isLoading || !demo.id}
                          className={`text-sm px-4 py-2 ml-4 rounded-lg font-semibold transition-all duration-200 ${!demo.id
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ...
                            </span>
                          ) : demo.id ? (
                            '▶ Run'
                          ) : (
                            'No ID'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {apiData.currentDemoFile && (
        <div className="mt-8 pt-6 border-t border-gray-600/50">
          <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <span className="text-[#FFD23F]">🎯</span>
            Current Session
          </h3>
          <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4">
            <p className="text-white font-medium">
              {apiData.currentDemoFile.filePath.split('/').pop()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {apiData.currentDemoFile.demo.length} demos executed
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
