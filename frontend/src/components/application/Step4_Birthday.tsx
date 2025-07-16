// In src/components/application/Step4_Birthday.tsx
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { updateField } from '../../store/loanApplicationSlice';
import { MonthInput } from '../MonthInput';
import { DayInput } from '../DayInput';
import { YearInput } from '../YearInput';

export const Step4_Birthday = () => {
  const dispatch: AppDispatch = useDispatch();
  const yearInputRef = useRef<HTMLInputElement>(null);
  const { birthMonth, birthDay, birthYear } = useSelector((state: RootState) => state.loanApplication.personalInfo);

  const handleDateChange = (field: 'birthMonth' | 'birthDay' | 'birthYear', value: string) => {
    dispatch(
      updateField({
        section: 'personalInfo',
        field,
        value,
      })
    );
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h2 className="text-2xl font-serif text-portola-green mb-8">
        When is your birthday?
      </h2>

      <div className="w-full max-w-lg">
        <div className="grid grid-cols-3 gap-4">
          <MonthInput
            label="Month"
            value={birthMonth}
            onChange={(value) => handleDateChange('birthMonth', value)}
            size="large"
          />
          <DayInput
            label="Day"
            value={birthDay}
            onChange={(value) => handleDateChange('birthDay', value)}
            onComplete={() => yearInputRef.current?.focus()}
            size="large"
          />
          <YearInput
            ref={yearInputRef}
            label="Year"
            value={birthYear}
            onChange={(value) => handleDateChange('birthYear', value)}
            size="large"
          />
        </div>
      </div>

      <p className="text-xs text-steel mt-8 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
        </svg>
        Your information is secured with 256-bit encryption.
      </p>
    </div>
  );
};