import React from 'react';
import { cn } from '../utils';

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'block cursor-pointer rounded-md border-2 bg-cloud p-4 transition-all duration-200',
          'hover:border-grass has-[:checked]:border-grass has-[:checked]:ring-2 has-[:checked]:ring-grass has-[:checked]:bg-cotton',
          'border-pebble',
          className
        )}
      >
        <div className="flex items-center">
          <input
            ref={ref}
            type="radio"
            id={id}
            className="h-5 w-5 border-2 border-pebble text-grass focus:ring-grass"
            {...props}
          />
          <span className="ml-4 font-serif text-base text-charcoal">
            {label}
          </span>
        </div>
      </label>
    );
  }
);
RadioCard.displayName = 'RadioCard';