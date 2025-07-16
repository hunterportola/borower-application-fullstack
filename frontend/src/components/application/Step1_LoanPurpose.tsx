import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { RadioCard } from '../RadioCard';

const loanPurposeOptions = [
  'Debt consolidation', 'Medical', 'Home improvement', 'Credit card consolidation',
  'Auto', 'Motorcycle', 'Major purchase', 'Start a business', 'Grow my business',
  'Education', 'Vacation', 'Wedding', 'IRS tax debt', 'Other'
];

// Add the onComplete prop back to the interface
interface Step1_LoanPurposeProps {
  onComplete: () => void;
}

export const Step1_LoanPurpose: React.FC<Step1_LoanPurposeProps> = ({ onComplete }) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedPurpose = useSelector((state: RootState) => state.loanApplication.loanDetails.loanPurpose);

  const handleChange = (purpose: string) => {
    dispatch(
      updateField({
        section: 'loanDetails',
        field: 'loanPurpose',
        value: purpose,
      })
    );
    // Add this line back to auto-advance
    setTimeout(() => onComplete(), 250);
  };

  return (
    <div className="w-full">
        <h2 className="text-2xl font-serif text-center text-portola-green mb-8">
          How are you going to use the money?
        </h2>
        <div className="space-y-4">
          {loanPurposeOptions.map((purpose) => (
            <RadioCard
              key={purpose}
              id={`purpose-${purpose}`}
              label={purpose}
              name="loanPurpose"
              value={purpose}
              checked={selectedPurpose === purpose}
              onChange={() => handleChange(purpose)}
            />
          ))}
        </div>
    </div>
  );
};