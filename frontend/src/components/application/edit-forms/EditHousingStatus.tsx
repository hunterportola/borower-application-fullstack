// In src/components/application/edit-forms/EditHousingStatusForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { RadioCard } from '../../RadioCard';

const housingStatusOptions = [
    'I rent this property',
    'I fully own this property (no mortgage)',
    'I own this property and pay a mortgage',
    'None of the above',
];

export const EditHousingStatusForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { housingStatus } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handleChange = (status: string) => {
        dispatch(updateField({ section: 'personalInfo', field: 'housingStatus', value: status }));
    };

    return (
        <div className="space-y-4">
            {housingStatusOptions.map((status) => (
                <RadioCard
                    key={status}
                    id={`edit-status-${status}`}
                    label={status}
                    name="editHousingStatus"
                    checked={housingStatus === status}
                    onChange={() => handleChange(status)}
                />
            ))}
        </div>
    );
};