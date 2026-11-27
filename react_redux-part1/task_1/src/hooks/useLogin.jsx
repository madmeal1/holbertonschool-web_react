import { useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isFormValid = (email, password) => EMAIL_REGEX.test(email) && password.length >= 8

function useLogin(onLogin = () => {}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enableSubmit, setEnableSubmit] = useState(false)

  const handleChangeEmail = (event) => {
    const { value } = event.target
    setEmail(value)
    setEnableSubmit(isFormValid(value, password))
  }

  const handleChangePassword = (event) => {
    const { value } = event.target
    setPassword(value)
    setEnableSubmit(isFormValid(email, value))
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    onLogin(email, password)
  }

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  }
}

export default useLogin
