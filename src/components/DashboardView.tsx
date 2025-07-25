import React from 'react';
import { Zap } from 'lucide-react';
import { ServiceStatus } from './ServiceStatus';
import { MetricChart } from './MetricChart';

interface DashboardViewProps {
  spikeData: {
    metric: string;
    service: string;
    timestamp: string;
    value: number;
  };
  metricData: Array<{
    timestamp: string;
    value: number;
  }>;
  onExplainClick?: () => void;
}

export function DashboardView({ spikeData, metricData, onExplainClick }: DashboardViewProps) {
  // Enhanced historical data with more data points
  const enhancedMetricData = [
    { timestamp: "11:45", value: 82 },
    { timestamp: "11:50", value: 89 },
    { timestamp: "11:55", value: 76 },
    { timestamp: "12:00", value: 85 },
    { timestamp: "12:05", value: 92 },
    { timestamp: "12:10", value: 78 },
    { timestamp: "12:15", value: 88 },
    { timestamp: "12:20", value: 95 },
    { timestamp: "12:25", value: 180 },
    { timestamp: "12:30", value: 420 }
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-red-600" />
          <h3 className="font-medium text-red-800 dark:text-red-400">Active Alert</h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          Latency spike detected in {spikeData.service} at {new Date(spikeData.timestamp).toLocaleTimeString()} UTC
        </p>
      </div>

      {/* Service Status */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Service Status</h2>
        <div className="grid grid-cols-1 gap-4">
          <ServiceStatus
            service="auth-service"
            status="critical"
            uptime="99.2%"
            requestRate={1250}
            errorRate={2.1}
          />
          <ServiceStatus
            service="user-service"
            status="healthy"
            uptime="99.9%"
            requestRate={850}
            errorRate={0.1}
          />
          <ServiceStatus
            service="payment-service"
            status="warning"
            uptime="99.7%"
            requestRate={420}
            errorRate={0.8}
          />
        </div>
      </div>

      {/* Metric Chart */}
      <MetricChart
        data={enhancedMetricData}
        threshold={100}
        spikeValue={spikeData.value}
        title="Service Latency"
        onExplainClick={onExplainClick}
      />

      {/* Integration Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integration Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Dynatrace</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Snowflake</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Slack</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">OpenAI</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Active</span>
          </div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Analyses</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">auth-service null pointer exception</span>
            <span className="text-gray-400 dark:text-gray-500">15m ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">api-gateway connection timeout</span>
            <span className="text-gray-400 dark:text-gray-500">1h ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">payment-service timeout</span>
            <span className="text-gray-400 dark:text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">user-service memory leak</span>
            <span className="text-gray-400 dark:text-gray-500">6h ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">api-gateway rate limit</span>
            <span className="text-gray-400 dark:text-gray-500">1d ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">database connection pool exhausted</span>
            <span className="text-gray-400 dark:text-gray-500">2d ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">redis cache miss spike</span>
            <span className="text-gray-400 dark:text-gray-500">3d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}