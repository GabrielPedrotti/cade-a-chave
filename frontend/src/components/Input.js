import React from 'react';

const Input = ({ label, placeholder, value, onChange, width, color }) => {
    return (
        <div className={`mb-4 w-${width ? width : '2/4'}`}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
                {label}
            </label>
            <input
                className={`w-full p-2 rounded text-${color ? color : 'gray-700'} shadow appearance-none leading-tight focus:outline-none focus:shadow-outline`}
                id={label}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;