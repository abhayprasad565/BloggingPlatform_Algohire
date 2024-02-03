import React, { useState } from 'react';
import Button from './Button';
import SearchBar from '../Components/SearchBar';


const TrendingNavbar = ({ trending }) => {
    console.log(trending);
    const [searchValue, setSearchValue] = useState();
    return (
        <>
            <div className='w-full flex justify-between bg-gray p-2 my-4 bg-gray-200 sm:px-10'>
                <div ><SearchBar placeholder={`Search Category`} value={searchValue} onChange={setSearchValue}></SearchBar>
                </div>
                <ul className="mx-2 sm:mx-10 flex flex-col sm:flex-row ">
                    <li className="mr-6">
                        <Button text={'Home'} to={'/feed/'}></Button>
                    </li>
                    {trending && trending.map((category, i) => {
                        console.log(category._id);
                        return <li className='mr-6'>
                            <Button text={category._id} to={'/feed/' + category._id}></Button>
                        </li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default TrendingNavbar;
