// In src/components/application/Step7_PhoneNumber.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { PhoneInput } from '../PhoneInput';

interface Step7_PhoneNumberProps {
    showErrors: boolean;
}

export const Step7_PhoneNumber: React.FC<Step7_PhoneNumberProps> = ({ showErrors }) => {
    const dispatch: AppDispatch = useDispatch();
    const { phoneNumber, textUpdatesConsent } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handlePhoneChange = (value: string) => {
        dispatch(updateField({ section: 'personalInfo', field: 'phoneNumber', value }));
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateField({ section: 'personalInfo', field: 'textUpdatesConsent', value: e.target.checked }));
    };

    return (
        <div className="w-full text-center flex flex-col items-center">
            <h2 className="text-2xl font-serif text-portola-green mb-8">
                What's your phone number?
            </h2>

            <div className="w-full max-w-md text-left">
                <PhoneInput
                    label="Phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    error="Please enter a valid phone number."
                    showError={showErrors && phoneNumber.length < 10}
                    size="large"
                />
                <div className="flex items-start mt-4">
                    <input
                        id="text-consent"
                        type="checkbox"
                        checked={textUpdatesConsent}
                        onChange={handleConsentChange}
                        className="h-5 w-5 rounded border-pebble text-grass focus:ring-grass mt-1"
                    />
                    <label htmlFor="text-consent" className="ml-3 text-sm text-steel">
                        I would like to receive updates on the status of my application via text message.
                    </label>
                </div>
            </div>
        </div>
    );
};