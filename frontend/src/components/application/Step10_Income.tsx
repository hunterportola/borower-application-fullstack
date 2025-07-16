// In src/components/application/Step10_Income.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { addIncomeSource, removeIncomeSource, updateIncomeField } from '../../store/loanApplicationSlice';
import { Dropdown } from '../Dropdown';
import { InputLarge } from '../InputLarge';
import { MonthInput } from '../MonthInput';
import { YearInput } from '../YearInput';
import { Button } from '../Button';
import { CurrencyInput } from '../CurrencyInput';

const incomeTypeOptions = [
    { value: 'employed-salary', label: 'Employed - Salary' },
    { value: 'employed-hourly', label: 'Employed - Hourly' },
    { value: 'employed-contractor', label: 'Employed - Independent Contractor' },
    { value: 'starting-new-job', label: 'Starting New Job Within 6 Months' },
    { value: 'self-employed-proprietor', label: 'Self Employed - Sole Proprietor' },
    { value: 'self-employed-partnership', label: 'Self Employed - Partnership/LLC' },
    { value: 'other', label: 'Other' },
    { value: 'none', label: 'None' },
];

const IncomeSourceForm = ({ source, index }: { source: any; index: number }) => {
    const dispatch: AppDispatch = useDispatch();

    const handleChange = (field: string, value: any) => {
        dispatch(updateIncomeField({ id: source.id, field: field as any, value }));
    };

    const renderConditionalFields = () => {
        switch (source.incomeType) {
            case 'employed-salary':
                return (
                    <>
                        <InputLarge label="Job title" value={source.jobTitle || ''} onChange={(e) => handleChange('jobTitle', e.target.value)} />
                        <InputLarge label="Company" value={source.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
                        <div className="flex gap-4">
                            <MonthInput label="Start month" value={source.startMonth || ''} onChange={(val) => handleChange('startMonth', val)} size="large" />
                            <YearInput label="Year" value={source.startYear || ''} onChange={(val) => handleChange('startYear', val)} size="large" />
                        </div>
                        <CurrencyInput label="Annual income" value={source.annualIncome || ''} onChange={(val) => handleChange('annualIncome', val)} size="large" />
                        <CurrencyInput label="Additional compensation" value={source.additionalCompensation || ''} onChange={(val) => handleChange('additionalCompensation', val)} size="large" />
                    </>
                );

            case 'employed-hourly':
                return (
                    <>
                        <InputLarge label="Job title" value={source.jobTitle || ''} onChange={(e) => handleChange('jobTitle', e.target.value)} />
                        <InputLarge label="Company" value={source.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
                        <div className="flex gap-4">
                            <MonthInput label="Start month" value={source.startMonth || ''} onChange={(val) => handleChange('startMonth', val)} size="large" />
                            <YearInput label="Year" value={source.startYear || ''} onChange={(val) => handleChange('startYear', val)} size="large" />
                        </div>
                        <CurrencyInput label="Hourly rate" value={source.hourlyRate || ''} onChange={(val) => handleChange('hourlyRate', val)} size="large" />
                         <InputLarge label="Hours per week" value={source.hoursPerWeek || ''} onChange={(e) => handleChange('hoursPerWeek', e.target.value)} />
                        <CurrencyInput label="Additional compensation" value={source.additionalCompensation || ''} onChange={(val) => handleChange('additionalCompensation', val)} size="large" />
                        <Dropdown label="Paycheck frequency" options={[{value: 'weekly', label: 'Weekly'}, {value: 'bi-weekly', label: 'Bi-weekly'}]} value={source.paycheckFrequency || ''} onChange={(val) => handleChange('paycheckFrequency', val)} size="large" />
                    </>
                );

            case 'employed-contractor':
            case 'starting-new-job':
                return (
                    <>
                        <InputLarge label="Job title" value={source.jobTitle || ''} onChange={(e) => handleChange('jobTitle', e.target.value)} />
                        <InputLarge label="Company" value={source.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
                        <div className="flex gap-4">
                            <MonthInput label="Start month" value={source.startMonth || ''} onChange={(val) => handleChange('startMonth', val)} size="large" />
                            <YearInput label="Year" value={source.startYear || ''} onChange={(val) => handleChange('startYear', val)} size="large" />
                        </div>
                        <CurrencyInput label="Annual income" value={source.annualIncome || ''} onChange={(val) => handleChange('annualIncome', val)} size="large" />
                    </>
                );

            case 'self-employed-proprietor':
            case 'self-employed-partnership':
                return (
                    <>
                         <InputLarge label="Description" value={source.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
                        <CurrencyInput label="Annual income" value={source.annualIncome || ''} onChange={(val) => handleChange('annualIncome', val)} size="large" />
                         <div className="flex gap-4">
                            <MonthInput label="Start month" value={source.startMonth || ''} onChange={(val) => handleChange('startMonth', val)} size="large" />
                            <YearInput label="Year" value={source.startYear || ''} onChange={(val) => handleChange('startYear', val)} size="large" />
                        </div>
                    </>
                );

            case 'other':
                return (
                    <>
                        <p className="text-xs text-steel">Alimony, child support, or separate maintenance income need not be disclosed if you do not wish to have it considered as a basis for repaying this obligation.</p>
                        <Dropdown label="Type" options={[{value: 'alimony', label: 'Alimony'}, {value: 'child-support', label: 'Child Support'}]} value={source.otherIncomeType || ''} onChange={(val) => handleChange('otherIncomeType', val)} size="large" />
                        <CurrencyInput label="Yearly amount" value={source.yearlyAmount || ''} onChange={(val) => handleChange('yearlyAmount', val)} size="large" />
                    </>
                );

            case 'none':
            default:
                return null;
        }
    };

    return (
        <div className="border border-pebble p-4 rounded-lg space-y-4 relative">
             {index > 0 && <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={() => dispatch(removeIncomeSource({ id: source.id }))}>Remove</Button>}
            <Dropdown
                label="Income type"
                options={incomeTypeOptions}
                value={source.incomeType}
                onChange={(val) => handleChange('incomeType', val)}
                size="large"
            />
            {source.incomeType && <div className="p-4 border-t border-sand space-y-4">{renderConditionalFields()}</div>}
        </div>
    );
};

export const Step10_Income: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const incomeSources = useSelector((state: RootState) => state.loanApplication.incomeInfo.sources);

    return (
        <div className="w-full text-left">
            <h2 className="text-3xl font-serif text-portola-green mb-8">
                What's your primary source of income?
            </h2>
            <div className="space-y-6">
                {incomeSources.map((source, index) => (
                    <IncomeSourceForm key={source.id} source={source} index={index} />
                ))}
            </div>
            <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => dispatch(addIncomeSource())}>
                    + I have another source of income
                </Button>
            </div>
        </div>
    );
};