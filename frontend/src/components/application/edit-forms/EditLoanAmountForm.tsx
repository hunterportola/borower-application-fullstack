// In src/components/application/edit-forms/EditLoanAmountForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { CurrencyInput } from '../../CurrencyInput';

export const EditLoanAmountForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loanAmount } = useSelector((state: RootState) => state.loanApplication.loanDetails);

    const handleChange = (value: string) => {
        dispatch(updateField({ section: 'loanDetails', field: 'loanAmount', value: parseFloat(value) || 0 }));
    };

    return (
        <div className="space-y-2">
            <CurrencyInput
                label="Loan amount"
                value={String(loanAmount)}
                onChange={handleChange}
                size="large"
            />
            <p className="text-xs text-steel px-1">
                Enter an amount between $1,000 and $75,000
            </p>
        </div>
    );
};