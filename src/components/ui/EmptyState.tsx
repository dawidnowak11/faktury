import React from 'react';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {icon && (
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {description}
      </p>
      {action && (
        <Button
          variant="primary"
          className="mt-4"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;