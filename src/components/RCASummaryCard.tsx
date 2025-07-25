import React, { useState } from 'react';
import { AlertTriangle, Clock, Bug, Code, ExternalLink, ChevronDown, ChevronUp, MessageSquare, Share } from 'lucide-react';

interface RCASummaryProps {
  spike: {
    metric: string;
    service: string;
    value: number;
    timestamp: string;
  };
  issue: {
    id: string;
    title: string;
    resolution: string;
  };
  codeSnippet: {
    file: string;
    function: string;
    snippet: string;
  };
  logs: Array<{
    timestamp: string;
    log_text: string;
  }>;
  confidence: number;
}

export function RCASummaryCard({ spike, issue, codeSnippet, logs, confidence }: RCASummaryProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('summary');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Root Cause Analysis</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                confidence >= 80 ? 'bg-green-100 text-green-700' :
                confidence >= 60 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {confidence}% Confidence
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Analysis completed for <span className="font-medium">{spike.service}</span> latency spike
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Explain</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <Share className="w-4 h-4" />
              <span>Share to Slack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Summary</h3>
            {expandedSection === 'summary' ? 
              <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            }
          </div>
        </button>
        
        {expandedSection === 'summary' && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800 dark:text-red-400">Spike Details</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Metric: <span className="font-mono">{spike.metric}</span></div>
                    <div>Value: <span className="font-semibold text-red-700 dark:text-red-400">{spike.value}ms</span></div>
                    <div>Time: <span className="font-mono">{new Date(spike.timestamp).toLocaleString()}</span></div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bug className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-400">Root Cause</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{issue.title}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
                      <ExternalLink className="w-3 h-3" />
                      <span>Issue #{issue.id}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-400">Recommended Fix</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">{issue.resolution}</p>
                
                <div className="bg-gray-900 dark:bg-gray-950 rounded p-3">
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{codeSnippet.file} - {codeSnippet.function}</div>
                  <code className="text-sm text-green-400 font-mono">{codeSnippet.snippet}</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logs Section */}
      <div className="border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => toggleSection('logs')}
          className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Relevant Logs</h3>
            {expandedSection === 'logs' ? 
              <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            }
          </div>
        </button>
        
        {expandedSection === 'logs' && (
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.log_text.includes('Exception') ? 'bg-red-100 text-red-700' :
                      log.log_text.includes('WARN') ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {log.log_text.includes('Exception') ? 'ERROR' :
                       log.log_text.includes('WARN') ? 'WARNING' : 'INFO'}
                    </span>
                  </div>
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-200 block whitespace-pre-wrap">
                    {log.log_text}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Analysis completed at {new Date().toLocaleString()}
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Escalate
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Fix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}