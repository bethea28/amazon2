import { createContext } from 'react'

const UserContext = createContext<any>('')
UserContext.displayName = 'UserContext'

export default UserContext;