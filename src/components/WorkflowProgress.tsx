import React from 'react';
import { Check, Loader2, Search, Brain, FileText } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  icon: React.ReactNode;
}

interface WorkflowProgressProps {
  steps: WorkflowStep[];
}

export function WorkflowProgress({ steps }: WorkflowProgressProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">AI Analysis Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4">
            {/* Step icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step.status === 'completed' ? 'bg-green-100 text-green-600' :
              step.status === 'active' ? 'bg-blue-100 text-blue-600' :
              'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              {step.status === 'completed' ? (
                <Check className="w-5 h-5" />
              ) : step.status === 'active' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                step.icon
              )}
            </div>
            
            {/* Step content */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className={`font-medium ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'active' ? 'text-blue-700' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.name}
                </h4>
                {step.status === 'active' && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Processing
                  </span>
                )}
                {step.status === 'completed' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Complete
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
            </div>
            
            {/* Progress line */}
            {index < steps.length - 1 && (
              <div className="absolute left-11 mt-12 w-0.5 h-4 bg-gray-200 dark:bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}