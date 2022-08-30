import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

const setTheCookie = (cookieName: string, value: string ) => {
    setCookie(cookieName, value, {expires: 0.5, path: ""})
}

const getTheCookie = (cookieName: string) => {
    return getCookie(cookieName)
}

const removeTheCookie = async (cookieName: string) => {
    removeCookie(cookieName, {path: ""})
}


export {
setTheCookie,
getTheCookie,
removeTheCookie
}