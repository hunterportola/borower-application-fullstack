import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

// ... (Your IncomeSource interface is correct) ...
interface IncomeSource { id: string; incomeType: string; jobTitle?: string; company?: string; startMonth?: string; startYear?: string; annualIncome?: number; hourlyRate?: number; hoursPerWeek?: number; additionalCompensation?: number; paycheckFrequency?: string; description?: string; otherIncomeType?: string; yearlyAmount?: number; }

interface LoanApplicationState {
  loanDetails: { loanPurpose: string; loanAmount: number; };
  personalInfo: { firstName: string; lastName: string; suffix: string; birthMonth: string; birthDay: string; birthYear: string; streetAddress: string; aptSuite: string; city: string; state: string; zipCode: string; housingStatus: string; phoneNumber: string; textUpdatesConsent: boolean; educationLevel: string; };
  educationInfo: { lastEnrolledYear: string; schoolName: string; graduationYear: string; areaOfStudy: string; };
  incomeInfo: { sources: IncomeSource[]; };
  financialInfo: { savingsAmount: string; investmentAmount: string; hasRecentLoans: boolean | null; vehicleOwnershipStatus: string; vehicleMileage: string; };
  // Add the new agreement section
  agreementInfo: {
    agreedToTerms: boolean;
  };
}

const initialState: LoanApplicationState = {
  // ... (other sections are the same) ...
  loanDetails: { loanPurpose: '', loanAmount: 10000 },
  personalInfo: { firstName: '', lastName: '', suffix: '', birthMonth: '', birthDay: '', birthYear: '', streetAddress: '', aptSuite: '', city: '', state: '', zipCode: '', housingStatus: '', phoneNumber: '', textUpdatesConsent: false, educationLevel: '', },
  educationInfo: { lastEnrolledYear: '', schoolName: '', graduationYear: '', areaOfStudy: '' },
  incomeInfo: { sources: [{ id: nanoid(), incomeType: '' }], },
  financialInfo: { savingsAmount: '', investmentAmount: '', hasRecentLoans: null, vehicleOwnershipStatus: '', vehicleMileage: '', },
  // Initialize the new section
  agreementInfo: {
    agreedToTerms: false,
  },
};

const loanApplicationSlice = createSlice({
    name: 'loanApplication',
    initialState,
    reducers: {
        // This reducer handles all simple sections
        updateField: (state, action: PayloadAction<{ section: keyof Omit<LoanApplicationState, 'incomeInfo' | 'agreementInfo'>; field: string; value: any }>) => {
          const { section, field, value } = action.payload;
          if (state[section]) {
            (state[section] as any)[field] = value;
          }
        },
        // This new reducer handles the agreement section
        updateAgreementField: (state, action: PayloadAction<{ field: 'agreedToTerms'; value: boolean }>) => {
            const { field, value } = action.payload;
            state.agreementInfo[field] = value;
        },
        // These reducers handle the complex income list
        addIncomeSource: (state) => { state.incomeInfo.sources.push({ id: nanoid(), incomeType: '' }); },
        removeIncomeSource: (state, action: PayloadAction<{ id: string }>) => { state.incomeInfo.sources = state.incomeInfo.sources.filter( (source) => source.id !== action.payload.id ); },
        updateIncomeField: (state, action: PayloadAction<{ id: string; field: keyof IncomeSource; value: any }>) => { const { id, field, value } = action.payload; const sourceToUpdate = state.incomeInfo.sources.find((source) => source.id === id); if (sourceToUpdate) { (sourceToUpdate as any)[field] = value; } },
    },
});

// Add updateAgreementField to the exports
export const { updateField, updateAgreementField, addIncomeSource, removeIncomeSource, updateIncomeField } = loanApplicationSlice.actions;
export default loanApplicationSlice.reducer;