import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

const setTheCookie = (cookieName: string, value: string, expiresIn: number ) => {
    setCookie(cookieName, value, {expires: expiresIn, path: ""})
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