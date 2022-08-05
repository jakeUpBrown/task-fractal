import React from 'react'
import ReactDropdown from 'react-dropdown';

const TypeDropdown = ({
    typeOptions,
    onChange,
    value,
    placeholder,
    label,
    isVisible = true,
}) => {
    if (!isVisible) return null;
    console.log('showing dropdown', label)
    return (
        <div className="form-group mb-3">
            <label className="mb-2">
                <strong>{label}</strong>
            </label>
            <ReactDropdown
                className='type-dropdown'
                options={typeOptions}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </div>
    )
}
export default TypeDropdown;