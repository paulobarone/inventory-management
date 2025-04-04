import React from 'react';
import { ConfirmationDialogProps } from '../types/Dialog';

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonText,
  cancelButtonText,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={onCancel}
          >
            {cancelButtonText}
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;