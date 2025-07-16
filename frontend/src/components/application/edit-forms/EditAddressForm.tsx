// In src/components/application/edit-forms/EditAddressForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { InputLarge } from '../../InputLarge';

export const EditAddressForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { streetAddress, aptSuite, city, state, zipCode } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'personalInfo', field, value }));
    };

    return (
        <div className="space-y-4">
            <InputLarge label="Street address" value={streetAddress} onChange={(e) => handleChange('streetAddress', e.target.value)} />
            <InputLarge label="Apt / Suite (Optional)" value={aptSuite} onChange={(e) => handleChange('aptSuite', e.target.value)} />
            <div className="flex gap-4">
                <div className="w-2/3">
                    <InputLarge label="City" value={city} onChange={(e) => handleChange('city', e.target.value)} />
                </div>
                <div className="w-1/3">
                    <InputLarge label="State" value={state} onChange={(e) => handleChange('state', e.target.value)} />
                </div>
            </div>
            <InputLarge label="Zip Code" value={zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} />
        </div>
    );
};