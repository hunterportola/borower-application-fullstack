// In src/components/application/edit-forms/EditPhoneNumberForm.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { PhoneInput } from '../../PhoneInput';

export const EditPhoneNumberForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { phoneNumber, textUpdatesConsent } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handlePhoneChange = (value: string) => {
        dispatch(updateField({ section: 'personalInfo', field: 'phoneNumber', value }));
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateField({ section: 'personalInfo', field: 'textUpdatesConsent', value: e.target.checked }));
    };

    return (
        <div className="space-y-4">
            <PhoneInput
                label="Phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                size="large"
            />
            <div className="flex items-start">
                <input
                    id="edit-text-consent"
                    type="checkbox"
                    checked={textUpdatesConsent}
                    onChange={handleConsentChange}
                    className="h-5 w-5 rounded border-pebble text-grass focus:ring-grass mt-1"
                />
                <label htmlFor="edit-text-consent" className="ml-3 text-sm text-steel">
                    I would like to receive updates on the status of my application via text message.
                </label>
            </div>
        </div>
    );
};