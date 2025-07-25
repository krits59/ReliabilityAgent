import React from 'react';
import { Clock, AlertTriangle, Database, Code } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'spike' | 'log' | 'analysis' | 'resolution';
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'pending';
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Timeline</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
        
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start space-x-4 pb-6">
            {/* Timeline dot and icon */}
            <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
              event.status === 'completed' ? 'bg-green-100 border-green-500' :
              event.status === 'active' ? 'bg-blue-100 border-blue-500' :
              'bg-gray-100 border-gray-300'
            }`}>
              <div className={`${
                event.status === 'completed' ? 'text-green-600' :
                event.status === 'active' ? 'text-blue-600' :
                'text-gray-400'
              }`}>
                {event.icon}
              </div>
            </div>
            
            {/* Event content */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{event.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}