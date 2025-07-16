// In src/components/application/edit-forms/EditRecentLoansForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { RadioCard } from '../../RadioCard';

export const EditRecentLoansForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { hasRecentLoans } = useSelector((state: RootState) => state.loanApplication.financialInfo);

    const handleChange = (value: boolean) => {
        dispatch(updateField({ section: 'financialInfo', field: 'hasRecentLoans', value }));
    };

    return (
        <div className="space-y-4">
            <RadioCard
                id="edit-recent-loans-yes"
                label="Yes"
                name="editRecentLoans"
                checked={hasRecentLoans === true}
                onChange={() => handleChange(true)}
            />
            <RadioCard
                id="edit-recent-loans-no"
                label="No"
                name="editRecentLoans"
                checked={hasRecentLoans === false}
                onChange={() => handleChange(false)}
            />
        </div>
    );
};