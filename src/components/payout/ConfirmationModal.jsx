import React from 'react';

const ConfirmationModal = ({ username, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full mx-4 sm:mx-0 z-50">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Confirm Update</h3>
        <p className="mb-4 text-sm sm:text-base">
          {username
            ? `Are you sure you want to update the status for ${username} to paid?`
            : 'Are you sure you want to update the status for all selected items to paid?'}
        </p>
        <div className="flex flex-col sm:flex-row justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            style={{ background: "#3AA6B9" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
