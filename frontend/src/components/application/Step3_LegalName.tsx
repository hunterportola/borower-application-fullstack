import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { InputLarge } from '../InputLarge';
import { Dropdown } from '../Dropdown';

const suffixOptions = [
  { value: 'Jr', label: 'Jr.' }, { value: 'Sr', label: 'Sr.' },
  { value: 'I', label: 'I' }, { value: 'II', label: 'II' },
  { value: 'III', label: 'III' }, { value: 'IV', label: 'IV' },
];

// Add showErrors to the props
interface Step3_LegalNameProps {
  showErrors: boolean;
}

export const Step3_LegalName: React.FC<Step3_LegalNameProps> = ({ showErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const { firstName, lastName, suffix } = useSelector((state: RootState) => state.loanApplication.personalInfo);

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      updateField({
        section: 'personalInfo',
        field: field,
        value: value,
      })
    );
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h2 className="text-2xl font-serif text-portola-green mb-2">
        What's your legal name?
      </h2>
      <p className="text-sm text-steel mb-8">
        Checking your rate won't affect your credit score.
      </p>

      <div className="w-full max-w-md space-y-4 text-left">
        <InputLarge
          label="Legal first name"
          value={firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          // Pass down the error props
          error="Please enter your first name."
          showError={showErrors && !firstName}
        />
        <div className="flex gap-4">
          <div className="flex-grow">
            <InputLarge
              label="Legal last name"
              value={lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              // Pass down the error props
              error="Please enter your last name."
              showError={showErrors && !lastName}
            />
          </div>
          <div className="w-1/3">
            <Dropdown
              label="Suffix"
              options={suffixOptions}
              value={suffix}
              onChange={(value) => handleInputChange('suffix', value)}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};