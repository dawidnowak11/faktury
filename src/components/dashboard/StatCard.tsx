import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className = ''
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <div className="flex items-center">
        <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</h3>
          <div className="flex items-center">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            {change && (
              <span 
                className={`ml-2 text-xs font-medium ${
                  change.positive 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {change.positive ? '↑' : '↓'} {change.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;