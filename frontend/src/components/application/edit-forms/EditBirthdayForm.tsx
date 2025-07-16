// In src/components/application/edit-forms/EditBirthdayForm.tsx
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { updateField } from '../../../store/loanApplicationSlice';
import { MonthInput } from '../../MonthInput';
import { DayInput } from '../../DayInput';
import { YearInput } from '../../YearInput';

export const EditBirthdayForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const yearInputRef = useRef<HTMLInputElement>(null);
    const { birthMonth, birthDay, birthYear } = useSelector((state: RootState) => state.loanApplication.personalInfo);

    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ section: 'personalInfo', field, value }));
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            <MonthInput
                label="Month"
                value={birthMonth}
                onChange={(val) => handleChange('birthMonth', val)}
                size="large"
            />
            <DayInput
                label="Day"
                value={birthDay}
                onChange={(val) => handleChange('birthDay', val)}
                onComplete={() => yearInputRef.current?.focus()}
                size="large"
            />
            <YearInput
                ref={yearInputRef}
                label="Year"
                value={birthYear}
                onChange={(val) => handleChange('birthYear', val)}
                size="large"
            />
        </div>
    );
};