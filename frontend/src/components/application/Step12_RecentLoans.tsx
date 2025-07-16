// In src/components/application/Step12_RecentLoans.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { RadioCard } from '../RadioCard';

interface Step12_RecentLoansProps {
  showErrors: boolean;
}

export const Step12_RecentLoans: React.FC<Step12_RecentLoansProps> = ({ showErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const { hasRecentLoans } = useSelector((state: RootState) => state.loanApplication.financialInfo);

  const handleChange = (value: boolean) => {
    dispatch(
      updateField({
        section: 'financialInfo',
        field: 'hasRecentLoans',
        value,
      })
    );
  };

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl font-serif text-portola-green mb-8">
        Have you taken out any new loans in the past 3 months?
      </h2>

      <div className="space-y-4 max-w-sm">
        <RadioCard
          id="recent-loans-yes"
          label="Yes"
          name="recentLoans"
          checked={hasRecentLoans === true}
          onChange={() => handleChange(true)}
        />
        <RadioCard
          id="recent-loans-no"
          label="No"
          name="recentLoans"
          checked={hasRecentLoans === false}
          onChange={() => handleChange(false)}
        />
      </div>
      {showErrors && hasRecentLoans === null && (
          <p className="text-alert font-sans text-sm mt-4">Please select an option.</p>
      )}
    </div>
  );
};