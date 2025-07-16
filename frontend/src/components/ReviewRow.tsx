// In src/components/ReviewRow.tsx
import { Button } from './Button';

interface ReviewRowProps {
  label: string;
  value: React.ReactNode;
  onEdit: () => void;
}

export const ReviewRow: React.FC<ReviewRowProps> = ({ label, value, onEdit }) => (
  <div className="flex justify-between items-start py-4 border-b border-sand">
    <div>
      <p className="text-sm text-steel">{label}</p>
      <p className="font-serif text-portola-green">{value || '-'}</p>
    </div>
    <Button variant="ghost" size="sm" onClick={onEdit} className="flex-shrink-0">
      {/* Replace the word "Edit" with this SVG icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-steel" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path 
          fillRule="evenodd" 
          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" 
          clipRule="evenodd" 
        />
      </svg>
    </Button>
  </div>
);