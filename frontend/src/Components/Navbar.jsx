import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';
import Button from './Button';
import user from '../Store/userInfo';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const userInfo = useRecoilValue(user);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
    const handleLogin = () => {
        localStorage.setItem('token', null);
        navigate('/login', { replace: true });

    }
    return (
        <div>  <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-1 sm:px-1 lg:px-1">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center ">
                        <Link className="block text-teal-600" href="/">
                            <span className="sr-only">Home</span>
                            <img src={logo} alt="" className='sm:w-[150px] sm:h-[70px] sm:mt-6 h-[80px] w-[100px]' />
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <NavLinkComponent to={`/feed`} title={`Home`} />
                                <NavLinkComponent to={`/profile/${userInfo ? userInfo.username : ""}`} title={`Profile`} />
                            </ul>
                        </nav>
                        {/* Nav links */}
                        <div className="sm:flex items-center gap-4 hidden">
                            {!userInfo &&
                                <>
                                    <Button to={'/login'} text={`login`} />
                                    <Button to={'/signup'} text={`Signup`} />

                                </>}
                            {userInfo && <div onClick={handleLogin}><Button to={`/login`} text={`Logout`} /></div>}
                        </div>
                        {/* Ham menu  */}
                        <div className='sm:hidden'>
                            <button
                                className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div
                                    className={`${genericHamburgerLine} ${isOpen
                                        ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                                        : "opacity-50 group-hover:opacity-100"
                                        }`}
                                />
                                <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
                                <div
                                    className={`${genericHamburgerLine} ${isOpen
                                        ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                                        : "opacity-50 group-hover:opacity-100"
                                        }`}
                                />
                            </button>

                        </div>
                    </div>
                    {/* ham menu options */}
                    <div className={`z-10 fixed sm:hidden ${isOpen ? `right-[1rem]` : `right-[-100rem]`} top-[4rem] rounded-md bg-gray-100 border-gray-400 border-2 p-2 transition-all h-fit w-[40%]`}>
                        <NavLinkComponent to={`/feed`} title={`Home`} />
                        <NavLinkComponent to={`/profile/${userInfo ? userInfo.username : ""}`} title={`Profile`} />
                        {!userInfo && <>
                            <NavLinkComponent to={`/login`} title={`Login `} />
                            <NavLinkComponent to={`/signup`} title={`Signup`} />
                        </>}
                        {userInfo && <div onClick={handleLogin} ><NavLinkComponent title={`Logout`} /></div>}
                    </div>
                </div>
            </div>
        </header>

        </div>
    );
}
function NavLinkComponent({ title, to }) {
    return (
        <li>
            <Link className="relative text-md w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center" to={to}>{title} </Link >
        </li >
    )
}


export default Navbar;
