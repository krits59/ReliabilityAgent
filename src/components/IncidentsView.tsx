import React from 'react';
import { AlertTriangle, Clock, Activity, TrendingUp, TrendingDown, CheckCircle, Zap, Database, Server, Users } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Investigating' | 'Resolved';
  timestamp: string;
  aiInsight: string;
  service: string;
}

export function IncidentsView() {
  const incidents: Incident[] = [
    {
      id: 'INC-2024-001',
      title: 'Snowflake Query Performance Degradation',
      severity: 'Critical',
      status: 'Active',
      timestamp: '5 minutes ago',
      aiInsight: 'AI detected high CPU usage correlation with recent warehouse scaling changes',
      service: 'data-warehouse'
    },
    {
      id: 'INC-2024-002',
      title: 'Authentication Service Latency',
      severity: 'High',
      status: 'Investigating',
      timestamp: '23 minutes ago',
      aiInsight: 'Dynatrace shows 400ms+ response times, likely database connection pool exhaustion',
      service: 'auth-service'
    },
    {
      id: 'INC-2024-003',
      title: 'Data Pipeline Delay',
      severity: 'Medium',
      status: 'Resolved',
      timestamp: '1 hour ago',
      aiInsight: 'Temporary network congestion resolved automatically via load balancer failover',
      service: 'data-pipeline'
    },
    {
      id: 'INC-2024-004',
      title: 'Payment Gateway Timeout',
      severity: 'High',
      status: 'Resolved',
      timestamp: '2 hours ago',
      aiInsight: 'Third-party API rate limiting detected, implemented circuit breaker pattern',
      service: 'payment-service'
    },
    {
      id: 'INC-2024-005',
      title: 'Redis Cache Miss Spike',
      severity: 'Medium',
      status: 'Resolved',
      timestamp: '4 hours ago',
      aiInsight: 'Cache invalidation pattern optimized, reducing miss rate by 60%',
      service: 'cache-service'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'High':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'Investigating':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Resolved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'data-warehouse':
        return <Database className="w-4 h-4" />;
      case 'auth-service':
        return <Users className="w-4 h-4" />;
      case 'data-pipeline':
        return <Activity className="w-4 h-4" />;
      case 'payment-service':
        return <Zap className="w-4 h-4" />;
      case 'cache-service':
        return <Server className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SRE Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Real-time monitoring and AI-powered insights for your infrastructure</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-medium">Active Incidents</h3>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">3</div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-red-400 mr-1" />
            <span className="text-red-400">+2 vs last hour</span>
          </div>
        </div>

        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-medium">SLO Compliance</h3>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">99.2%</div>
          <div className="flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
            <span className="text-red-400">-0.3% vs last hour</span>
          </div>
        </div>

        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-medium">Avg MTTR</h3>
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">12m</div>
          <div className="flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400">-5m vs last hour</span>
          </div>
        </div>

        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-medium">Services Health</h3>
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">94%</div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400">+2% vs last hour</span>
          </div>
        </div>
      </div>

      {/* Recent Incidents & AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Recent Incidents & AI Insights</h2>
          <p className="text-gray-600 dark:text-gray-300">AI-powered analysis and root cause hypotheses</p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {incidents.map((incident) => (
            <div key={incident.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getServiceIcon(incident.service)}
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{incident.id}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{incident.timestamp}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{incident.title}</h3>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Insight: </span>
                    <span className="text-sm text-blue-700 dark:text-blue-300">{incident.aiInsight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Average Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">12m</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Avg Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Resolution Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}