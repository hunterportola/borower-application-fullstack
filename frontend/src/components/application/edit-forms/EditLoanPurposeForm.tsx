// In src/components/application/edit-forms/EditLoanPurposeForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { RadioCard } from '../../RadioCard';

const loanPurposeOptions = [
  'Debt consolidation', 'Medical', 'Home improvement', 'Credit card consolidation',
  'Auto', 'Motorcycle', 'Major purchase', 'Start a business', 'Grow my business',
  'Education', 'Vacation', 'Wedding', 'IRS tax debt', 'Other'
];

export const EditLoanPurposeForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loanPurpose } = useSelector((state: RootState) => state.loanApplication.loanDetails);

    const handleChange = (purpose: string) => {
        dispatch(updateField({ section: 'loanDetails', field: 'loanPurpose', value: purpose }));
    };

    return (
        <div className="space-y-4 max-h-96 overflow-y-auto">
            {loanPurposeOptions.map((purpose) => (
                <RadioCard
                    key={purpose}
                    id={`edit-purpose-${purpose}`}
                    label={purpose}
                    name="editLoanPurpose"
                    value={purpose}
                    checked={loanPurpose === purpose}
                    onChange={() => handleChange(purpose)}
                />
            ))}
        </div>
    );
};