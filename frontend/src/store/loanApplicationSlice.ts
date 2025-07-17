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
        loadApplicationData: (state, action: PayloadAction<any>) => {
            const data = action.payload;
            if (data.loan) {
                state.loanDetails.loanPurpose = data.loan.requestedPurpose || '';
                state.loanDetails.loanAmount = data.loan.requestedAmount || 10000;
            }
            if (data.borrower) {
                const [month, day, year] = (data.borrower.dateOfBirth || '').split('/');
                state.personalInfo.firstName = data.borrower.firstName || '';
                state.personalInfo.lastName = data.borrower.lastName || '';
                state.personalInfo.birthMonth = month || '';
                state.personalInfo.birthDay = day || '';
                state.personalInfo.birthYear = year || '';
                state.personalInfo.phoneNumber = data.borrower.phoneNumber || '';
                state.personalInfo.housingStatus = data.borrower.housingStatus || '';
                if (data.borrower.address) {
                    state.personalInfo.streetAddress = data.borrower.address.street || '';
                    state.personalInfo.aptSuite = data.borrower.address.aptSuite || '';
                    state.personalInfo.city = data.borrower.address.city || '';
                    state.personalInfo.state = data.borrower.address.state || '';
                    state.personalInfo.zipCode = data.borrower.address.zipCode || '';
                }
            }
            if (data.employment) {
                state.personalInfo.educationLevel = data.employment.educationLevel || '';
                if (data.employment.educationDetails) {
                    state.educationInfo.lastEnrolledYear = data.employment.educationDetails.lastEnrolledYear || '';
                    state.educationInfo.schoolName = data.employment.educationDetails.schoolName || '';
                    state.educationInfo.graduationYear = data.employment.educationDetails.graduationYear || '';
                    state.educationInfo.areaOfStudy = data.employment.educationDetails.areaOfStudy || '';
                }
                if (data.employment.income && data.employment.income.length > 0) {
                    state.incomeInfo.sources = data.employment.income.map((income: any) => ({
                        id: income.id || nanoid(),
                        incomeType: income.incomeType || '',
                        jobTitle: income.jobTitle || '',
                        company: income.company || '',
                        startMonth: income.startMonth || '',
                        startYear: income.startYear || '',
                        annualIncome: income.annualIncome || 0,
                        additionalCompensation: income.additionalCompensation || 0,
                    }));
                }
                if (data.employment.savings) {
                    state.financialInfo.savingsAmount = data.employment.savings.savingsAmount || '';
                    state.financialInfo.investmentAmount = data.employment.savings.investmentAmount || '';
                    state.financialInfo.hasRecentLoans = data.employment.savings.hasRecentLoans ?? null;
                    state.financialInfo.vehicleOwnershipStatus = data.employment.savings.vehicleOwnershipStatus || '';
                    state.financialInfo.vehicleMileage = data.employment.savings.vehicleMileage || '';
                }
            }
        },
    },
});

// Add updateAgreementField to the exports
export const { updateField, updateAgreementField, addIncomeSource, removeIncomeSource, updateIncomeField, loadApplicationData } = loanApplicationSlice.actions;
export default loanApplicationSlice.reducer;