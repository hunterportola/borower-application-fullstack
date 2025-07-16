// In src/components/application/Step6_HousingStatus.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { RadioCard } from '../RadioCard';

const housingStatusOptions = [
  'I rent this property',
  'I fully own this property (no mortgage)',
  'I own this property and pay a mortgage',
  'None of the above',
];

interface Step6_HousingStatusProps {
    showErrors: boolean;
}

export const Step6_HousingStatus: React.FC<Step6_HousingStatusProps> = ({ showErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const { streetAddress, housingStatus } = useSelector((state: RootState) => state.loanApplication.personalInfo);

  const handleChange = (status: string) => {
    dispatch(
      updateField({
        section: 'personalInfo',
        field: 'housingStatus',
        value: status,
      })
    );
  };

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl font-serif text-portola-green mb-2">
        Do you currently rent or own <span className="text-forest-moss">{streetAddress}</span>?
      </h2>
      <p className="text-sm text-steel mb-8">
        We use this to help determine if equity in your home could provide even lower rates.
      </p>

      <div className="space-y-4">
        {housingStatusOptions.map((status) => (
          <RadioCard
            key={status}
            id={`status-${status}`}
            label={status}
            name="housingStatus"
            value={status}
            checked={housingStatus === status}
            onChange={() => handleChange(status)}
          />
        ))}
      </div>
       {showErrors && !housingStatus && (
            <p className="text-alert font-sans text-sm mt-4">Please select an option.</p>
       )}
    </div>
  );
};