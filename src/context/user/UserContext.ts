import { createContext } from 'react'
import TokenData from '../../types/Tokens';
import UserData from "../../types/User";

type UserContextData = {
    user: UserData | undefined;
    sessionId: string | undefined;
    loginUser: (response: TokenData) => Promise<void>;
    logoutUser: () => Promise<void>;
    isLoggedIn: () => boolean;
}

const initialValues = {
    user: undefined,
    sessionId: undefined,
    isLoggedIn: () => false
}

const UserContext = createContext<Partial<UserContextData>>(initialValues)
UserContext.displayName = 'UserContext'

export default UserContext;