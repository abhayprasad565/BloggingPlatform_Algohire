import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ value, placeholder, onChange }) => {
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate("/feed/" + "?category=" + value);
    }
    return (
        <div className="relative w-full    box-border ">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-2  p-1 rounded-lg  box-border  border-2 border-gray-500 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" onClick={handleSearch} className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    );
}

export default SearchBar;