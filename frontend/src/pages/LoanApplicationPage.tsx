import { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Button } from '../components/Button';
import { EditModal } from '../components/EditModal';
import { submitApplication } from '../lib/api';

// Lazy load all step components for better performance
const Step1_LoanPurpose = lazy(() => import('../components/application/Step1_LoanPurpose').then(m => ({ default: m.Step1_LoanPurpose })));
const Step2_LoanAmount = lazy(() => import('../components/application/Step2_LoanAmount').then(m => ({ default: m.Step2_LoanAmount })));
const Step3_LegalName = lazy(() => import('../components/application/Step3_LegalName').then(m => ({ default: m.Step3_LegalName })));
const Step4_Birthday = lazy(() => import('../components/application/Step4_Birthday').then(m => ({ default: m.Step4_Birthday })));
const Step5_Address = lazy(() => import('../components/application/Step5_Address').then(m => ({ default: m.Step5_Address })));
const Step6_HousingStatus = lazy(() => import('../components/application/Step6_HousingStatus').then(m => ({ default: m.Step6_HousingStatus })));
const Step7_PhoneNumber = lazy(() => import('../components/application/Step7_PhoneNumber').then(m => ({ default: m.Step7_PhoneNumber })));
const Step8_Education = lazy(() => import('../components/application/Step8_Education').then(m => ({ default: m.Step8_Education })));
const Step9_EducationDetails = lazy(() => import('../components/application/Step9_EducationDetails').then(m => ({ default: m.Step9_EducationDetails })));
const Step10_Income = lazy(() => import('../components/application/Step10_Income').then(m => ({ default: m.Step10_Income })));
const Step11_Savings = lazy(() => import('../components/application/Step11_Savings').then(m => ({ default: m.Step11_Savings })));
const Step12_RecentLoans = lazy(() => import('../components/application/Step12_RecentLoans').then(m => ({ default: m.Step12_RecentLoans })));
const Step13_Vehicle = lazy(() => import('../components/application/Step13_Vehicle').then(m => ({ default: m.Step13_Vehicle })));
const Step14_Review = lazy(() => import('../components/application/Step14_Review').then(m => ({ default: m.Step14_Review })));
const Step15_Agreement = lazy(() => import('../components/application/Step15_Agreement').then(m => ({ default: m.Step15_Agreement })));

// Import all edit form components
import { EditLoanAmountForm } from '../components/application/edit-forms/EditLoanAmountForm';
import { EditLoanPurposeForm } from '../components/application/edit-forms/EditLoanPurposeForm';
import { EditLegalNameForm } from '../components/application/edit-forms/EditLegalNameForm';
import { EditAddressForm } from '../components/application/edit-forms/EditAddressForm';
import { EditBirthdayForm } from '../components/application/edit-forms/EditBirthdayForm';
import { EditPhoneNumberForm } from '../components/application/edit-forms/EditPhoneNumberForm';
import { EditHousingStatusForm } from '../components/application/edit-forms/EditHousingStatus';
import { EditEducationForm } from '../components/application/edit-forms/EditEducationForm';
import { EditRecentLoansForm } from '../components/application/edit-forms/EditRecentLoansForm';
import { EditVehicleForm } from '../components/application/edit-forms/EditVehicleForm';


const TOTAL_STEPS = 15; // This is the final step count

export function LoanApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const { personalInfo, financialInfo, agreementInfo } = useSelector((state: RootState) => state.loanApplication);
  const applicationState = useSelector((state: RootState) => state.loanApplication);

  const handleEditSection = (section: string) => { setEditingSection(section); };
  const handleCloseModal = () => { setEditingSection(null); };

  const handleNext = () => {
    let isStepValid = true;
    if (currentStep === 3) { isStepValid = personalInfo.firstName.trim() !== '' && personalInfo.lastName.trim() !== ''; }
    else if (currentStep === 5) { isStepValid = personalInfo.streetAddress.trim() !== '' && personalInfo.city.trim() !== '' && personalInfo.state.trim() !== '' && personalInfo.zipCode.trim() !== ''; }
    else if (currentStep === 6) { isStepValid = personalInfo.housingStatus.trim() !== ''; }
    else if (currentStep === 7) { isStepValid = personalInfo.phoneNumber.length === 10; }
    else if (currentStep === 8) { isStepValid = personalInfo.educationLevel.trim() !== ''; }
    else if (currentStep === 12) { isStepValid = financialInfo.hasRecentLoans !== null; }
    else if (currentStep === 13) { isStepValid = financialInfo.vehicleOwnershipStatus.trim() !== ''; if (isStepValid && financialInfo.vehicleOwnershipStatus !== "No, I don't own a vehicle") { isStepValid = financialInfo.vehicleMileage.trim() !== ''; } }
    else if (currentStep === 15) { isStepValid = agreementInfo.agreedToTerms; }
    
    if (!isStepValid) {
        setShowErrors(true);
        return;
    }
    
    if (currentStep === TOTAL_STEPS) {
        // Submit the application to the backend
        const handleSubmit = async () => {
            setIsSubmitting(true);
            setSubmissionError(null);
            
            try {
                const result = await submitApplication(applicationState);
                if (result.data) {
                    setSubmissionSuccess(true);
                    setSubmissionError(null);
                    // Application submitted successfully - user can see success message
                } else if (result.error) {
                    setSubmissionError(result.error.message || 'Failed to submit application');
                }
            } catch (error) {
                setSubmissionError('Network error. Please check your connection and try again.');
            } finally {
                setIsSubmitting(false);
            }
        };
        
        if (!isSubmitting && !submissionSuccess) {
            handleSubmit();
        }
        return;
    }

    setShowErrors(false);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setShowErrors(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1_LoanPurpose onComplete={handleNext} />;
      case 2: return <Step2_LoanAmount />;
      case 3: return <Step3_LegalName showErrors={showErrors} />;
      case 4: return <Step4_Birthday />;
      case 5: return <Step5_Address showErrors={showErrors} />;
      case 6: return <Step6_HousingStatus showErrors={showErrors} />;
      case 7: return <Step7_PhoneNumber showErrors={showErrors} />;
      case 8: return <Step8_Education showErrors={showErrors} />;
      case 9: return <Step9_EducationDetails showErrors={showErrors} />;
      case 10: return <Step10_Income />;
      case 11: return <Step11_Savings />;
      case 12: return <Step12_RecentLoans showErrors={showErrors} />;
      case 13: return <Step13_Vehicle showErrors={showErrors} />;
      case 14: return <Step14_Review onEdit={handleEditSection} />;
      case 15: return <Step15_Agreement />; // Add the final case
      default: return <Step1_LoanPurpose onComplete={handleNext} />;
    }
  };

  const getModalContent = () => {
    switch (editingSection) {
        case 'loanAmount': return { title: 'Edit Loan Amount', form: <EditLoanAmountForm /> };
        case 'loanPurpose': return { title: 'Edit Loan Purpose', form: <EditLoanPurposeForm /> };
        case 'legalName': return { title: 'Edit Legal Name', form: <EditLegalNameForm /> };
        case 'address': return { title: 'Edit Address', form: <EditAddressForm /> };
        case 'birthday': return { title: 'Edit Birthday', form: <EditBirthdayForm /> };
        case 'phoneNumber': return { title: 'Edit Phone Number', form: <EditPhoneNumberForm /> };
        case 'housingStatus': return { title: 'Edit Housing Status', form: <EditHousingStatusForm /> };
        case 'education': return { title: 'Edit Education', form: <EditEducationForm /> };
        case 'recentLoans': return { title: 'Edit Recent Loans', form: <EditRecentLoansForm /> };
        case 'vehicle': return { title: 'Edit Vehicle Information', form: <EditVehicleForm /> };
        default: return { title: '', form: null };
    }
  };
  
  const modalContent = getModalContent();

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      {/* Success Message */}
      {submissionSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="text-green-800">
              <h3 className="text-lg font-medium">Application Submitted Successfully!</h3>
              <p className="mt-1 text-sm">We've received your loan application and will review it shortly.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {submissionError && !submissionSuccess && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="text-red-800">
              <h3 className="text-lg font-medium">Submission Error</h3>
              <p className="mt-1 text-sm">{submissionError}</p>
              <button 
                onClick={() => setSubmissionError(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-cloud p-6 sm:p-8 rounded-lg shadow-medium border border-pebble min-h-[400px]">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-sm text-gray-600">Loading step...</p>
            </div>
          </div>
        }>
          {renderStep()}
        </Suspense>
      </div>
      
      <EditModal isOpen={editingSection !== null} onClose={handleCloseModal} onUpdate={handleCloseModal} title={modalContent.title}>
        {modalContent.form}
      </EditModal>

      <div className="flex w-full gap-4 mt-8">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          className={currentStep === 1 ? 'invisible' : 'w-1/4'}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext}
          className={currentStep === 1 ? 'invisible' : 'w-3/4'}
          disabled={isSubmitting || submissionSuccess}
        >
          {isSubmitting ? 'Submitting...' : 
           submissionSuccess ? 'Application Submitted' :
           currentStep === TOTAL_STEPS ? 'Agree and check your rate' : 'Next'}
        </Button>
      </div>
    </div>
  );
}