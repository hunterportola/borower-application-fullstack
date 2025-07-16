// In src/components/application/Step14_Review.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { ReviewRow } from '../ReviewRow';

interface Step14_ReviewProps {
  onEdit: (section: string) => void;
}

export const Step14_Review: React.FC<Step14_ReviewProps> = ({ onEdit }) => {
  const applicationState = useSelector((state: RootState) => state.loanApplication);
  // All of these will now be used
  const { loanDetails, personalInfo, educationInfo, incomeInfo, financialInfo } = applicationState;

  const formatAddress = () => {
    return `${personalInfo.streetAddress}, ${personalInfo.city}, ${personalInfo.state} ${personalInfo.zipCode}`;
  };

  const formatCurrency = (value: string | number) => {
    const num = Number(value) || 0;
    return `$${num.toLocaleString()}`;
  }

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl font-serif text-portola-green mb-2">
        Please review your information
      </h2>
      <p className="text-sm text-steel mb-8">
        Submitting inaccurate information can cause your rate to change or application to be disqualified.
      </p>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-4">
        <ReviewRow label="Loan amount" value={formatCurrency(loanDetails.loanAmount)} onEdit={() => onEdit('loanAmount')} />
        <ReviewRow label="Loan purpose" value={loanDetails.loanPurpose} onEdit={() => onEdit('loanPurpose')} />
        <ReviewRow label="Legal name" value={`${personalInfo.firstName} ${personalInfo.lastName}`} onEdit={() => onEdit('legalName')} />
        <ReviewRow label="Address" value={formatAddress()} onEdit={() => onEdit('address')} />
        <ReviewRow label="Home Ownership" value={personalInfo.housingStatus} onEdit={() => onEdit('housingStatus')} />
        <ReviewRow label="Date of birth" value={`${personalInfo.birthMonth}/${personalInfo.birthDay}/${personalInfo.birthYear}`} onEdit={() => onEdit('birthday')} />
        <ReviewRow label="Phone number" value={personalInfo.phoneNumber} onEdit={() => onEdit('phoneNumber')} />
        <ReviewRow label="Highest level of education" value={personalInfo.educationLevel} onEdit={() => onEdit('education')} />
        <ReviewRow label="Education details" value={`${educationInfo.schoolName}, ${educationInfo.graduationYear}`} onEdit={() => onEdit('education')} />
        <ReviewRow label="Income" value={incomeInfo.sources[0]?.incomeType} onEdit={() => onEdit('income')} />
        <ReviewRow label="Total savings and investments" value={formatCurrency(financialInfo.savingsAmount)} onEdit={() => onEdit('savings')} />
        <ReviewRow label="New loans" value={financialInfo.hasRecentLoans ? 'Yes' : 'No'} onEdit={() => onEdit('recentLoans')} />
        <ReviewRow label="Vehicle ownership" value={financialInfo.vehicleOwnershipStatus} onEdit={() => onEdit('vehicle')} />
      </div>
    </div>
  );
};