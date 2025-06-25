import React from 'react';
import { X as XIcon } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-orange-500">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon size={24} />
                    </button>
                </div>
                <div className="text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;