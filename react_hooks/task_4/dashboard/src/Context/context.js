import { createContext } from 'react'

export const user = {
  email: '',
  password: '',
  isLoggedIn: false,
}

export const logOut = () => {}

const newContext = createContext({ user, logOut })

export default newContext
