import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ name, options, onSelect, disabled=false, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const selectedDisplay = selectedValue || name;

    useEffect(() => {
        if (disabled) {
           if(onSelect) onSelect(name)
        }
    }, [disabled, name, onSelect]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const handleSelect = (option) => {
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };
    
    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                disabled={disabled}
                className="bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg inline-flex items-center w-full justify-between transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="truncate">{selectedDisplay}</span>
                <ChevronDown size={20} className="ml-2 flex-shrink-0"/>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-56 bg-gray-800 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                    {options.length === 0 ? <span className="block px-4 py-2 text-gray-500">No options</span> :
                     options.map(option => (
                         <a href="#" key={option} onClick={(e) => { e.preventDefault(); handleSelect(option); }} className="block px-4 py-2 text-gray-300 hover:bg-orange-600 hover:text-white">{option}</a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterDropdown;