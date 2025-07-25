import React from 'react';
import { Timeline } from './Timeline';
import { WorkflowProgress } from './WorkflowProgress';
import { RCASummaryCard } from './RCASummaryCard';
import { Search, Brain, Code, Zap } from 'lucide-react';

interface AIAnalysisViewProps {
  analysisStarted: boolean;
  spikeData: {
    metric: string;
    service: string;
    timestamp: string;
    value: number;
  };
  logs: Array<{
    timestamp: string;
    log_text: string;
  }>;
  knownIssue: {
    issue_id: string;
    title: string;
    resolution: string;
  };
  codeSnippet: {
    file: string;
    function: string;
    snippet: string;
  };
}

export function AIAnalysisView({ 
  analysisStarted, 
  spikeData, 
  logs, 
  knownIssue, 
  codeSnippet 
}: AIAnalysisViewProps) {
  // Timeline events
  const timelineEvents = [
    {
      id: '1',
      timestamp: '12:30:00',
      type: 'spike' as const,
      title: 'Latency Spike Detected',
      description: `${spikeData.service} latency reached ${spikeData.value}ms`,
      icon: <Zap className="w-4 h-4" />,
      status: 'completed' as const
    },
    {
      id: '2',
      timestamp: '12:30:15',
      type: 'log' as const,
      title: 'Tracer Agent Activated',
      description: 'Fetching relevant logs from time window',
      icon: <Search className="w-4 h-4" />,
      status: 'completed' as const
    },
    {
      id: '3',
      timestamp: '12:30:45',
      type: 'analysis' as const,
      title: 'Log Analysis Complete',
      description: 'AI identified suspicious patterns and root cause',
      icon: <Brain className="w-4 h-4" />,
      status: 'completed' as const
    },
    {
      id: '4',
      timestamp: '12:31:10',
      type: 'resolution' as const,
      title: 'RCA Summary Generated',
      description: 'Root cause analysis with recommended fixes',
      icon: <Code className="w-4 h-4" />,
      status: 'completed' as const
    }
  ];

  // Workflow steps
  const workflowSteps = [
    {
      id: 'detection',
      name: 'Spike Detection',
      description: 'Monitoring system detected latency anomaly',
      status: 'completed' as const,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'tracer',
      name: 'Tracer Agent',
      description: 'Fetching logs and traces from affected services',
      status: 'completed' as const,
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'analyzer',
      name: 'Log Analyzer',
      description: 'AI analyzing patterns and correlating with known issues',
      status: 'completed' as const,
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 'summary',
      name: 'RCA Summary',
      description: 'Generating comprehensive root cause analysis',
      status: 'completed' as const,
      icon: <Code className="w-5 h-5" />
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Workflow and Timeline */}
      <div className="space-y-6">
        <WorkflowProgress steps={workflowSteps} />
        <Timeline events={timelineEvents} />
      </div>

      {/* Right Column - RCA Summary */}
      <div className="space-y-6">
        {analysisStarted && (
          <RCASummaryCard
            spike={spikeData}
            issue={knownIssue}
            codeSnippet={codeSnippet}
            logs={logs}
            confidence={87}
          />
        )}
      </div>
    </div>
  );
}