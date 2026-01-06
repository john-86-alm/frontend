import { createContext } from 'react'

const UserContext = createContext({
    text: '',
    changeText: () => {},
})

export default UserContext
