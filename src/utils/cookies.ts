import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

const in1Hour = 1/24;
const setTheCookie = (cookieName: string, value: string ) => {
    setCookie(cookieName, value, {expires: in1Hour, path: ""})
}

const getTheCookie = (cookieName: string) => {
    return getCookie(cookieName)
}

const removeTheCookie = (cookieName: string) => {
    removeCookie(cookieName, {path: ""})
}


export {
setTheCookie,
getTheCookie,
removeTheCookie
}