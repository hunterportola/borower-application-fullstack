// In src/components/application/Step15_Agreement.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateAgreementField } from '../../store/loanApplicationSlice';

export const Step15_Agreement = () => {
    const dispatch: AppDispatch = useDispatch();
    const { agreedToTerms } = useSelector((state: RootState) => state.loanApplication.agreementInfo);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAgreementField({ field: 'agreedToTerms', value: e.target.checked }));
    };

    return (
        <div className="w-full text-left">
            <h2 className="text-3xl font-serif text-portola-green mb-4">
                Agree and check your rate
            </h2>

            <div className="space-y-4 text-sm text-steel">
                <div className="flex items-start">
                    <input
                        id="agree-terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-pebble text-grass focus:ring-grass mt-1 flex-shrink-0"
                    />
                    <label htmlFor="agree-terms" className="ml-3">
                        By checking the box, clicking “Agree and see your rate” below, you agree:
                    </label>
                </div>

                <ul className="list-disc list-outside space-y-3 pl-8">
                    <li>To the <a href="#" className="text-grass underline">Electronic Communications Policy and Consent</a> to receive communications and disclosures electronically.</li>
                    <li>To the <a href="#" className="text-grass underline">Portola Terms and Conditions</a>, and the <a href="#" className="text-grass underline">Portola Privacy Policy</a>. You authorize Portola to share your data with selected partners and third parties with whom we work closely to send you relevant offers which might interest you.</li>
                    <li>You are providing consent to Portola, its affiliates, service providers, and lending partners to access your credit report from consumer reporting agencies in accordance with the <a href="#" className="text-grass underline">Authorization To Obtain Credit Reports</a>. Soft credit inquiries may occur following this loan offer request until you withdraw your consent and will not affect your credit score.</li>
                </ul>
            </div>
        </div>
    );
};