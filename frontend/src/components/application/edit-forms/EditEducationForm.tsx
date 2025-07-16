// In src/components/application/edit-forms/EditEducationForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { InputLarge } from '../../InputLarge';
import { YearInput } from '../../YearInput';
import { Dropdown } from '../../Dropdown';

const educationOptions = [
    { value: 'less-than-high-school', label: 'Less than high school' },
    { value: 'high-school-diploma', label: 'High school diploma' },
    { value: 'associate', label: 'Associate' },
    { value: 'bachelors', label: "Bachelor's" },
    { value: 'masters', label: 'Masters' },
    { value: 'phd', label: 'PhD' },
];

export const EditEducationForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { educationLevel } = useSelector((state: RootState) => state.loanApplication.personalInfo);
    const educationInfo = useSelector((state: RootState) => state.loanApplication.educationInfo);

    const handlePersonalInfoChange = (value: string) => {
        dispatch(updateField({ section: 'personalInfo', field: 'educationLevel', value }));
    };

    const handleEducationInfoChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'educationInfo', field, value }));
    };

    return (
        <div className="space-y-4">
            <Dropdown
                label="Highest level of education"
                options={educationOptions}
                value={educationLevel}
                onChange={handlePersonalInfoChange}
                size="large"
            />

            {educationLevel === 'less-than-high-school' && (
                 <YearInput
                    label="Last enrolled year"
                    value={educationInfo.lastEnrolledYear}
                    onChange={(val) => handleEducationInfoChange('lastEnrolledYear', val)}
                    size="large"
                />
            )}

            {educationLevel === 'high-school-diploma' && (
                 <YearInput
                    label="Graduation year"
                    value={educationInfo.graduationYear}
                    onChange={(val) => handleEducationInfoChange('graduationYear', val)}
                    size="large"
                />
            )}

            {['associate', 'bachelors', 'masters', 'phd'].includes(educationLevel) && (
                <div className="space-y-4 pt-4 border-t border-sand">
                    <InputLarge label="School" value={educationInfo.schoolName} onChange={(e) => handleEducationInfoChange('schoolName', e.target.value)} />
                    <YearInput label="Graduation year" value={educationInfo.graduationYear} onChange={(val) => handleEducationInfoChange('graduationYear', val)} size="large" />
                </div>
            )}
        </div>
    );
};