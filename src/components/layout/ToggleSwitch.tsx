import React, { useEffect, useState } from 'react';

interface ToggleSwitchProps<T> {
    label: string;
    className?: string;
    classNameLabel?: string;
    initialValue: boolean;
    handleChange: (value: T) => void;
    locked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps<any>> = ({ label, initialValue, handleChange, className, classNameLabel, locked = false }) => {
    const [enabled_, setEnabled_] = useState(false);

    useEffect(() => {
        setEnabled_(initialValue);
    }, [initialValue, enabled_]);

    return (
        <div className={`flex items-center ${className}`} >
            {label && <label htmlFor="flex-checkbox" className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-300 mr-2">
                {label}
            </label>}
            <div className="flex items-center justify-center">
                <div
                    role="switch"
                    aria-checked={enabled_}
                    tabIndex={0}
                    className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${enabled_ ? 'bg-green-600' : 'bg-gray-400'}`}
                    onClick={(e) => {
                        if (!locked) {
                            handleChange(!enabled_);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (!locked && (e.key === 'Enter' || e.key === ' ')) {
                            handleChange(!enabled_);
                        }
                    }}
                >
                    <div
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${enabled_ ? 'translate-x-8' : 'translate-x-0'
                            }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ToggleSwitch;