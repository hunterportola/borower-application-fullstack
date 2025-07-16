// In src/components/application/Step13_Vehicle.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { RadioCard } from '../RadioCard';
import { InputLarge } from '../InputLarge';

const vehicleStatusOptions = [
  "Yes, and it's fully paid off",
  "Yes, and I'm currently leasing it",
  "Yes, and I have an active auto loan",
  "No, I don't own a vehicle",
];

interface Step13_VehicleProps {
  showErrors: boolean;
}

export const Step13_Vehicle: React.FC<Step13_VehicleProps> = ({ showErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const { vehicleOwnershipStatus, vehicleMileage } = useSelector((state: RootState) => state.loanApplication.financialInfo);

  // Determine if the mileage input should be shown
  const showMileageInput = vehicleOwnershipStatus && vehicleOwnershipStatus !== "No, I don't own a vehicle";

  const handleStatusChange = (status: string) => {
    dispatch(updateField({ section: 'financialInfo', field: 'vehicleOwnershipStatus', value: status }));
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ section: 'financialInfo', field: 'vehicleMileage', value: e.target.value }));
  };

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl font-serif text-portola-green mb-2">
        Do you currently own a vehicle?
      </h2>
      <p className="text-sm text-steel mb-8">
        By considering your vehicle, we may be able to offer you a lower rate and monthly payment.
      </p>

      <div className="space-y-4">
        {vehicleStatusOptions.map((status) => (
          <RadioCard
            key={status}
            id={`vehicle-status-${status}`}
            label={status}
            name="vehicleStatus"
            checked={vehicleOwnershipStatus === status}
            onChange={() => handleStatusChange(status)}
          />
        ))}
      </div>

      {showMileageInput && (
        <div className="mt-6 p-6 border-t border-pebble">
          <InputLarge
            label="How many miles does it have?"
            value={vehicleMileage}
            onChange={handleMileageChange}
            placeholder="Enter Vehicle Mileage"
            error="Please enter the vehicle mileage."
            showError={showErrors && !vehicleMileage}
          />
           <p className="text-xs text-steel mt-1 px-1">
              The more accurate the reported mileage, the better.
          </p>
        </div>
      )}

      {showErrors && !vehicleOwnershipStatus && (
          <p className="text-alert font-sans text-sm mt-4">Please select an option.</p>
      )}
    </div>
  );
};