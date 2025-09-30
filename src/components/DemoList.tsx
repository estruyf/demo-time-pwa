import React from 'react';
import { ApiData } from '../types/api';

interface DemoListProps {
  apiData: ApiData;
  onRunById: (id: string, bringToFront?: boolean) => Promise<void>;
}

export const DemoList: React.FC<DemoListProps> = ({ apiData, onRunById }) => {
  const handleRunDemo = async (id: string, title: string) => {
    try {
      await onRunById(id, true);
    } catch (error) {
      console.error('Failed to run demo:', error);
      alert(`Failed to run "${title}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const currentlyExecuted = new Set(
    apiData.currentDemoFile?.demo.map(d => d.id).filter(Boolean) || []
  );

  const isCurrentlyExecuted = (demoId: string) => currentlyExecuted.has(demoId);
  const isNextDemo = (demoId: string) => apiData.nextDemo?.id === demoId;

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          All Demos
        </h2>
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

                    return (
                      <div
                        key={demoIndex}
                        className={`flex items-center gap-3 py-3 transition-all duration-200 cursor-pointer hover:bg-gray-700/20 rounded-lg px-3 -mx-3 ${isNext
                            ? 'bg-[#FFD23F]/10'
                            : ''
                          }`}
                        onClick={() => demo.id && handleRunDemo(demo.id, demo.title)}
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                          {isExecuted ? (
                            <div className="w-6 h-6 rounded-full bg-green-600/80 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : isNext ? (
                            <div className="w-6 h-6 rounded-full border-2 border-[#FFD23F] flex items-center justify-center">
                              <div className="w-3 h-3 bg-[#FFD23F] rounded-full"></div>
                            </div>
                          ) : (
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium text-base ${isNext ? 'text-white font-semibold' : isExecuted ? 'text-gray-400' : 'text-gray-200'}`}>
                          {demo.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
