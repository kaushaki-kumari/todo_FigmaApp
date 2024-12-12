import React from 'react';

function DeleteTodo({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; 
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-sm mb-4">Are you sure you want to delete this todo?</h2>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2 hover:bg-slate-600 hover:text-white"
            onClick={onClose} > Cancel </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900"
            onClick={onConfirm}> Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTodo;
