import React from 'react';

const FormSubmitButton = ({ text }) => {
    return (
        <>
            <button className="relative w-full inline-block  py-2 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-blue-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-blue-700 group-hover:bg-blue-700"></span>
                <span className="relative text-blue-700 rounded group-hover:text-white">{text}</span>
            </button>
        </>
    );
}

export default FormSubmitButton;