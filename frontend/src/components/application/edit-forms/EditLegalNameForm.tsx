// In src/components/application/edit-forms/EditLegalNameForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { InputLarge } from '../../InputLarge';
import { Dropdown } from '../../Dropdown';

const suffixOptions = [
  { value: 'Jr', label: 'Jr.' }, { value: 'Sr', label: 'Sr.' },
  { value: 'I', label: 'I' }, { value: 'II', label: 'II' },
  { value: 'III', label: 'III' }, { value: 'IV', label: 'IV' },
];

export const EditLegalNameForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { firstName, lastName, suffix } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'personalInfo', field, value }));
    };

    return (
        <div className="space-y-4">
            <InputLarge
                label="Legal first name"
                value={firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
            />
            <InputLarge
                label="Legal last name"
                value={lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
            />
            <Dropdown
                label="Suffix"
                options={suffixOptions}
                value={suffix}
                onChange={(value) => handleChange('suffix', value)}
                size="large"
            />
        </div>
    );
};