
import './App.css'
import Navbar from './Components/Navbar';
import Feed from './Pages/Feed'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UserProfile from './Pages/UserProfile'
import ErrorPage from './Pages/ErrorPage'
import { Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import user from './Store/userInfo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isLoggedIn from './Store/isLoggedIn';
import fetchData from './Hooks/apiCall';
import errorPopup from './Store/errorPopup';

function App() {
  const error = useRecoilValue(errorPopup);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(user);
  const isLogin = useRecoilValue(isLoggedIn);
  const setError = useSetRecoilState(errorPopup);
  useEffect(() => {

    const fetchUserData = async () => {
      const params = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      }
      const res = await fetchData('/account/user', params, setError);
      if (res) {
        // set profile owner
        setUserInfo(res.user);
      }
      else navigate("/login", { replace: true });
    }
    fetchUserData();
  }, [isLogin])
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/profile/:username' element={<UserProfile />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/feed/:category' element={<Feed />}></Route>
        <Route path='/feed/' element={<Feed />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
      {error}
    </>
  )
}

export default App
