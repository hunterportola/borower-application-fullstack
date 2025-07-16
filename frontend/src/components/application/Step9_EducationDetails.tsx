// In src/components/application/Step9_EducationDetails.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { InputLarge } from '../InputLarge';
import { YearInput } from '../YearInput';
import { Dropdown } from '../Dropdown';

interface Step9_EducationDetailsProps {
    showErrors: boolean;
}

export const Step9_EducationDetails: React.FC<Step9_EducationDetailsProps> = ({ showErrors }) => {
    const dispatch: AppDispatch = useDispatch();
    const { educationLevel } = useSelector((state: RootState) => state.loanApplication.personalInfo);
    const educationInfo = useSelector((state: RootState) => state.loanApplication.educationInfo);

    const handleInputChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'educationInfo', field, value }));
    };

    const renderFormByEducation = () => {
        switch (educationLevel) {
            case 'less-than-high-school':
                return (
                    <>
                        <h2 className="text-2xl font-serif text-portola-green mb-8">When were you last enrolled in school?</h2>
                        <YearInput
                            label="Last enrolled year"
                            value={educationInfo.lastEnrolledYear}
                            onChange={(val) => handleInputChange('lastEnrolledYear', val)}
                            error="Please enter the year."
                            showError={showErrors && !educationInfo.lastEnrolledYear}
                            size="large"
                        />
                    </>
                );

            case 'high-school-diploma':
                return (
                    <>
                        <h2 className="text-2xl font-serif text-portola-green mb-8">When did you graduate from high school?</h2>
                        <YearInput
                            label="Graduation or expected graduation year"
                            value={educationInfo.graduationYear}
                            onChange={(val) => handleInputChange('graduationYear', val)}
                            error="Please enter a graduation year."
                            showError={showErrors && !educationInfo.graduationYear}
                            size="large"
                        />
                    </>
                );

            case 'bachelors':
            case 'masters':
            case 'phd':
                 return (
                    <>
                        <h2 className="text-2xl font-serif text-portola-green mb-8">Tell us about your {educationLevel} program.</h2>
                        <InputLarge label="School" value={educationInfo.schoolName} onChange={(e) => handleInputChange('schoolName', e.target.value)} />
                        <Dropdown label="Area of study" options={[{value: 'stem', label: 'STEM'}, {value: 'humanities', label: 'Humanities'}]} value={educationInfo.areaOfStudy} onChange={(val) => handleInputChange('areaOfStudy', val)} size="large" />
                        <YearInput label="Graduation or expected graduation year" value={educationInfo.graduationYear} onChange={(val) => handleInputChange('graduationYear', val)} size="large" />
                    </>
                );

            case 'associate':
            case 'certificate-program':
            case 'pharmd':
            case 'jd':
            case 'dds':
            case 'md':
            default:
                return (
                     <>
                        <h2 className="text-2xl font-serif text-portola-green mb-8">Tell us about your {educationLevel} program.</h2>
                        <InputLarge label="School" value={educationInfo.schoolName} onChange={(e) => handleInputChange('schoolName', e.target.value)} />
                        <YearInput label="Graduation or expected graduation year" value={educationInfo.graduationYear} onChange={(val) => handleInputChange('graduationYear', val)} size="large" />
                    </>
                );
        }
    };

    return (
        <div className="w-full text-center flex flex-col items-center">
            <div className="w-full max-w-md space-y-4 text-left">
                {renderFormByEducation()}
            </div>
        </div>
    );
};