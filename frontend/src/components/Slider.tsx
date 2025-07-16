// In src/components/Slider.tsx
import React from 'react';
import { cn } from '../utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueLabel?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueLabel, ...props }, ref) => {
    const { min = 0, max = 100, value = 50 } = props;

    const getProgress = (value: number, min: number, max: number) => {
      return ((value - min) / (max - min)) * 100;
    };

    const progress = getProgress(Number(value), Number(min), Number(max));

    // Define the style as a CSS variable for our component to use
    const sliderStyle = {
      '--progress': `${progress}%`,
    } as React.CSSProperties;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-steel mb-2">
            {label}
          </label>
        )}
        {/* The input is now wrapped in a div */}
        <div className="slider-container" style={sliderStyle}>
            <input
              ref={ref}
              type="range"
              className={cn('w-full h-4', className)}
              {...props}
            />
        </div>
        {valueLabel && (
            <div className="flex justify-between text-xs text-steel mt-1">
                <span>{valueLabel.split('/')[0]}</span>
                <span>{valueLabel.split('/')[1]}</span>
            </div>
        )}
      </div>
    );
  }
);
Slider.displayName = 'Slider';