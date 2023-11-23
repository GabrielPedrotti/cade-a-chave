import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                checked={checked}
                onChange={onChange}
            />
            <label className="ml-2 text-gray-700">{label}</label>
        </div>
    );
};

export default Checkbox;