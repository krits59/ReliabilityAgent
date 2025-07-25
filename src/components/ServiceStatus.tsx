import React from 'react';
import { Server, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface ServiceStatusProps {
  service: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  requestRate: number;
  errorRate: number;
}

export function ServiceStatus({ service, status, uptime, requestRate, errorRate }: ServiceStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'critical':
        return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    }
  };

  return (
    <div className={`rounded-lg border p-4 transition-colors duration-200 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Server className="w-4 h-4" />
          <h3 className="font-medium">{service}</h3>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <Activity className="w-3 h-3" />
            <span className="text-xs font-medium">Uptime</span>
          </div>
          <div className="font-semibold">{uptime}</div>
        </div>
        
        <div>
          <div className="text-xs font-medium mb-1">Requests/min</div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">{requestRate.toLocaleString()}</div>
        </div>
        
        <div>
          <div className="text-xs font-medium mb-1">Error Rate</div>
          <div className="font-semibold">{errorRate}%</div>
        </div>
      </div>
    </div>
  );
}