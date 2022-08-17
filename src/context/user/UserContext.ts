import { createContext } from 'react'
import { Dispatch, SetStateAction } from "react";
import UserData from "../../types/User";

type SessionData = {
    user: UserData | undefined;
    setUser: Dispatch<SetStateAction<UserData | undefined>>;
    sessionId: string | undefined;
    setSessionId: Dispatch<SetStateAction<string | undefined>>;
    accessToken: string | undefined,
    setAccessToken: Dispatch<SetStateAction<string | undefined>>;
}

const initialValues = {
    user: undefined,
    sessionId: "",
    accessToken: "",
    setUser: (): void => {},
    setSessionId: (): void => {},
    setAccessToken: (): void => {}
}

const UserContext = createContext<SessionData>(initialValues)
UserContext.displayName = 'UserContext'

export default UserContext;