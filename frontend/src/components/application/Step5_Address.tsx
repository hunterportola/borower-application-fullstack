// In src/components/application/Step5_Address.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { InputLarge } from '../InputLarge';

interface Step5_AddressProps {
    showErrors: boolean;
}

export const Step5_Address: React.FC<Step5_AddressProps> = ({ showErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const { streetAddress, aptSuite, city, state, zipCode } = useSelector((state: RootState) => state.loanApplication.personalInfo);

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
      <h2 className="text-2xl font-serif text-portola-green mb-8">
        What is your current address?
      </h2>

      <div className="w-full max-w-md space-y-4 text-left">
        <InputLarge
          label="Street address"
          value={streetAddress}
          onChange={(e) => handleInputChange('streetAddress', e.target.value)}
          error="Please enter your street address."
          showError={showErrors && !streetAddress}
        />
        <InputLarge
          label="Apt / Suite (Optional)"
          value={aptSuite}
          onChange={(e) => handleInputChange('aptSuite', e.target.value)}
        />
        <div className="flex gap-4">
          <div className="w-2/3">
            <InputLarge
              label="City"
              value={city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error="Please enter your city."
              showError={showErrors && !city}
            />
          </div>
          <div className="w-1/3">
            <InputLarge
              label="State"
              value={state}
              onChange={(e) => handleInputChange('state', e.target.value)}
               error="State is required."
              showError={showErrors && !state}
            />
          </div>
        </div>
         <InputLarge
          label="Zip Code"
          value={zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          error="Please enter your zip code."
          showError={showErrors && !zipCode}
        />
      </div>
    </div>
  );
};