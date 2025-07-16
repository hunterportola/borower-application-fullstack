// In src/components/application/Step8_Education.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { Dropdown } from '../Dropdown';

const educationOptions = [
    { value: 'less-than-high-school', label: 'Less than high school' },
    { value: 'high-school-diploma', label: 'High school diploma' },
    { value: 'associate', label: 'Associate' },
    { value: 'certificate-program', label: 'Certificate Program' },
    { value: 'bachelors', label: "Bachelor's" },
    { value: 'pharmd', label: 'PharmD' },
    { value: 'masters', label: 'Masters' },
    { value: 'mba', label: 'MBA' },
    { value: 'phd', label: 'PhD' },
    { value: 'jd', label: 'JD' },
    { value: 'dds', label: 'DDS' },
    { value: 'md', label: 'MD' },
];

interface Step8_EducationProps {
    showErrors: boolean;
}

export const Step8_Education: React.FC<Step8_EducationProps> = ({ showErrors }) => {
    const dispatch: AppDispatch = useDispatch();
    const { educationLevel } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handleChange = (value: string) => {
        dispatch(updateField({ section: 'personalInfo', field: 'educationLevel', value }));
    };

    return (
        <div className="w-full text-center flex flex-col items-center">
            <h2 className="text-2xl font-serif text-portola-green mb-8">
                What's your highest level of education?
            </h2>
            <div className="w-full max-w-md">
                <Dropdown
                    label="Highest level of education"
                    options={educationOptions}
                    value={educationLevel}
                    onChange={handleChange}
                    error="Please select your education level."
                    showError={showErrors && !educationLevel}
                    size="large"
                />
            </div>
        </div>
    );
};