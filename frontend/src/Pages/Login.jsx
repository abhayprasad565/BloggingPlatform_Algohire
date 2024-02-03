
import React, { useState } from 'react';
import InputBox from '../Components/InputBox';
import FormSubmitButton from '../Components/FormSubmitButton';
import Heading from '../Components/Heading';
import { Link } from 'react-router-dom';
import fetchData from '../Hooks/apiCall';
import { useSetRecoilState } from 'recoil';
import errorPopup from '../Store/errorPopup';
import { useNavigate } from 'react-router-dom'
import isLoggedIn from '../Store/isLoggedIn';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setError = useSetRecoilState(errorPopup);
    const navigate = useNavigate();
    const setLogin = useSetRecoilState(isLoggedIn);
    const handleLogin = async () => {
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: email,
                    password: password,
                }
            })
        }
        const res = await fetchData('/account/login', params, setError);
        if (res != null) {
            localStorage.setItem('token', res.token);
            navigate('/profile/' + email, { replace: true });
            setLogin(true);
        };
    }
    return (
        <div className='w-full h-[80%]  my-4 flex items-center justify-center box-border'>
            <div className='sm:w-1/3 w-full h-fit my-3 pb-4 px-16 items-center border border-md'>
                <Heading text={`Login to Slack`}></Heading>
                <InputBox label={`Username`} type={`text`} value={email} change={setEmail} />
                <InputBox label={`password`} type={`password`} value={password} change={setPassword} />
                <div onClick={handleLogin}><FormSubmitButton text={`Login`} /></div>
                <div className='text-sm my-2 text-center'>New to Slack? <Link className='text-blue-700 hover:underline' to={`/signup`}>Signup</Link></div>
            </div>
        </div>
    );
}

export default Login;