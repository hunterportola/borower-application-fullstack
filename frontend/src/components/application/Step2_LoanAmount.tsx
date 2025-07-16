// In src/components/application/Step2_LoanAmount.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { Slider } from '../Slider';

// Helper function to format numbers as currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const Step2_LoanAmount = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loanPurpose, loanAmount } = useSelector((state: RootState) => state.loanApplication.loanDetails);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateField({
        section: 'loanDetails',
        field: 'loanAmount',
        value: parseInt(e.target.value, 10),
      })
    );
  };

  // Determine the title based on the loan purpose from Step 1
  const getTitle = () => {
    if (loanPurpose === 'Debt consolidation') {
      return "What's your estimated debt balance?";
    }
    if (loanPurpose === 'Credit card consolidation') {
      return 'What is your estimated credit card balance?';
    }
    return 'How much would you like to borrow?';
  };

  return (
    <div className="w-full text-center flex flex-col items-center justify-center pt-8">
      <h2 className="text-2xl font-serif text-portola-green mb-6">
        {getTitle()}
      </h2>
      <p className="text-5xl font-serif text-forest-moss mb-10">
        {formatCurrency(loanAmount)}
      </p>
      <Slider
        min="2000"
        max="100000"
        step="1000"
        value={loanAmount}
        onChange={handleAmountChange}
        valueLabel="$2,000/$100,000"
      />
    </div>
  );
};