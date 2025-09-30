import React from 'react';
import { ApiData, DemoStep } from '../types/api';
import { Icon } from 'vscrui';

interface DemoListProps {
  apiData: ApiData;
  onRunById: (stepIndex: number, bringToFront?: boolean) => Promise<void>;
}

export const DemoList: React.FC<DemoListProps> = ({ apiData, onRunById }) => {
  const handleRunDemo = async (stepIndex: number) => {
    try {
      await onRunById(stepIndex, true);
    } catch (error) {
      console.error('Failed to run demo:', error);
    }
  };

  const allSteps: DemoStep[] = [];
  apiData.demos.forEach(demoFile => {
    demoFile.children.forEach(step => {
      allSteps.push(step);
    });
  });

  const isNextDemo = (step: DemoStep) => {
    return apiData.nextDemo?.title === step.originalLabel;
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          All Demos
        </h2>
      </div>

      {allSteps.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-400 text-lg">No demo steps found</p>
          <p className="text-sm text-gray-500 mt-2">
            Load a demo file in Demo Time to see demos here
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {allSteps.map((step, index) => {
            const isExecuted = step.hasExecuted;
            const isNext = isNextDemo(step);

            return (
              <div
                key={index}
                className={`flex items-center gap-3 py-3 transition-all duration-200 cursor-pointer hover:bg-gray-700/20 rounded-lg px-3 -mx-3 ${
                  isNext ? 'bg-[#FFD23F]/10' : ''
                }`}
                onClick={() => handleRunDemo(step.stepIndex)}
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {isExecuted ? (
                    <Icon name="pass-filled" className="text-green-600" size={24} />
                  ) : isNext ? (
                    <Icon name="circle-large-filled" className="text-[#FFD23F]" size={16} />
                  ) : (
                    <Icon name="chevron-right" className="text-gray-500" size={24} />
                  )}
                </div>
                <span
                  className={`font-medium text-base ${
                    isNext
                      ? 'text-white font-semibold'
                      : isExecuted
                      ? 'text-gray-400'
                      : 'text-gray-200'
                  }`}
                >
                  {step.originalLabel}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};