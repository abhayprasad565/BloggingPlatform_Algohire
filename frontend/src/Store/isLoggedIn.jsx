import { atom } from 'recoil';
const isLoggedIn = atom({
    key: 'isLoggedIn',
    default: null,
})
export default isLoggedIn;