// In src/components/application/Step11_Savings.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { CurrencyInput } from '../CurrencyInput';

export const Step11_Savings = () => {
    const dispatch: AppDispatch = useDispatch();
    const { savingsAmount, investmentAmount } = useSelector((state: RootState) => state.loanApplication.financialInfo);

    const handleInputChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'financialInfo', field, value }));
    };

    return (
        <div className="w-full text-center flex flex-col items-center">
            <h2 className="text-3xl font-serif text-portola-green mb-8">
                How much do you have in savings?
            </h2>
            <div className="w-full max-w-md space-y-4 text-left">
                <CurrencyInput
                    label="Checking & savings accounts"
                    value={savingsAmount}
                    onChange={(value) => handleInputChange('savingsAmount', value)}
                    size="large"
                />
                <div>
                    <CurrencyInput
                        label="Investment accounts"
                        value={investmentAmount}
                        onChange={(value) => handleInputChange('investmentAmount', value)}
                        size="large"
                    />
                    <p className="text-xs text-steel mt-1 px-1">
                        Examples of investment accounts include index funds, mutual funds, 401(k), and IRA.
                    </p>
                </div>
            </div>
        </div>
    );
};