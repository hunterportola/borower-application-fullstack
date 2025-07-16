// In src/components/EditModal.tsx
import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  title: string;
  children: React.ReactNode;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onUpdate, title, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleUpdate = () => {
    onUpdate();
    onClose(); // Close the modal after updating
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        {children}
        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={handleUpdate} className="w-full">
            Update
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};