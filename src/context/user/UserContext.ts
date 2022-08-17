import { createContext, Dispatch, SetStateAction } from 'react'
import TokenData from '../../types/Tokens';
import UserData from "../../types/User";

type UserContextData = {
    user: UserData | undefined;
    sessionId: string | undefined;
    loginUser: (response: TokenData) => Promise<void> | void;
    logoutUser: () => Promise<void> | void;
    isLoggedIn: boolean | undefined;
}

const initialValues = {
    user: undefined,
    sessionId: undefined,
    loginUser: () => {},
    logoutUser: () => {},
    isLoggedIn: false
}

const UserContext = createContext<UserContextData>(initialValues)
UserContext.displayName = 'UserContext'

export default UserContext;