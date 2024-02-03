import React from 'react';
import { Link } from 'react-router-dom';


const Button = ({ text, to }) => {
    return (
        <Link to={to} className="relative inline-block px-4 py-2 font-medium group sm:text-md text-sm">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-blue-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-blue-700 group-hover:bg-blue-700"></span>
            <span className="relative text-blue-700 rounded group-hover:text-white">{text}</span>
        </Link>
    );
}

export default Button;