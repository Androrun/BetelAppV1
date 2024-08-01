import React from 'react';
import ReactDOM from 'react-dom';

const PetsModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative border-0">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default PetsModal;




