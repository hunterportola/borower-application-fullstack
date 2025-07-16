// In src/components/application/edit-forms/EditVehicleForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { RadioCard } from '../../RadioCard';
import { InputLarge } from '../../InputLarge';

const vehicleStatusOptions = [
    "Yes, and it's fully paid off",
    "Yes, and I'm currently leasing it",
    "Yes, and I have an active auto loan",
    "No, I don't own a vehicle",
];

export const EditVehicleForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { vehicleOwnershipStatus, vehicleMileage } = useSelector((state: RootState) => state.loanApplication.financialInfo);
    const showMileageInput = vehicleOwnershipStatus && vehicleOwnershipStatus !== "No, I don't own a vehicle";

    const handleStatusChange = (status: string) => {
        dispatch(updateField({ section: 'financialInfo', field: 'vehicleOwnershipStatus', value: status }));
    };

    const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateField({ section: 'financialInfo', field: 'vehicleMileage', value: e.target.value }));
    };

    return (
        <div className="space-y-4">
            {vehicleStatusOptions.map((status) => (
                <RadioCard
                    key={status}
                    id={`edit-vehicle-${status}`}
                    label={status}
                    name="editVehicleStatus"
                    checked={vehicleOwnershipStatus === status}
                    onChange={() => handleStatusChange(status)}
                />
            ))}
            {showMileageInput && (
                <div className="pt-4 border-t border-sand">
                    <InputLarge
                        label="Vehicle Mileage"
                        value={vehicleMileage}
                        onChange={handleMileageChange}
                    />
                </div>
            )}
        </div>
    );
};