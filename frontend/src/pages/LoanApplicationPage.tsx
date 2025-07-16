import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Button } from '../components/Button';
import { EditModal } from '../components/EditModal';

// Import all step components
import { Step1_LoanPurpose } from '../components/application/Step1_LoanPurpose';
import { Step2_LoanAmount } from '../components/application/Step2_LoanAmount';
import { Step3_LegalName } from '../components/application/Step3_LegalName';
import { Step4_Birthday } from '../components/application/Step4_Birthday';
import { Step5_Address } from '../components/application/Step5_Address';
import { Step6_HousingStatus } from '../components/application/Step6_HousingStatus';
import { Step7_PhoneNumber } from '../components/application/Step7_PhoneNumber';
import { Step8_Education } from '../components/application/Step8_Education';
import { Step9_EducationDetails } from '../components/application/Step9_EducationDetails';
import { Step10_Income } from '../components/application/Step10_Income';
import { Step11_Savings } from '../components/application/Step11_Savings';
import { Step12_RecentLoans } from '../components/application/Step12_RecentLoans';
import { Step13_Vehicle } from '../components/application/Step13_Vehicle';
import { Step14_Review } from '../components/application/Step14_Review';
import { Step15_Agreement } from '../components/application/Step15_Agreement'; // Import the final step

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

  const { personalInfo, financialInfo, agreementInfo } = useSelector((state: RootState) => state.loanApplication);

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
        // Here you would typically submit the form data to your backend
        console.log("Submitting Application...");
        alert("Application Submitted!");
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
      <div className="bg-cloud p-6 sm:p-8 rounded-lg shadow-medium border border-pebble min-h-[400px]">
        {renderStep()}
      </div>
      
      <EditModal isOpen={editingSection !== null} onClose={handleCloseModal} onUpdate={handleCloseModal} title={modalContent.title}>
        {modalContent.form}
      </EditModal>

      <div className="flex w-full gap-4 mt-8">
        <Button variant="outline" onClick={handleBack} className={currentStep === 1 ? 'invisible' : 'w-1/4'}>Back</Button>
        <Button 
          variant="primary" 
          onClick={handleNext}
          className={currentStep === 1 ? 'invisible' : 'w-3/4'}
        >
          {currentStep === TOTAL_STEPS ? 'Agree and check your rate' : 'Next'}
        </Button>
      </div>
    </div>
  );
}