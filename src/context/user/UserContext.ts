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

const UserContext = createContext<UserContextData | undefined>(undefined)
UserContext.displayName = 'UserContext'

export default UserContext;