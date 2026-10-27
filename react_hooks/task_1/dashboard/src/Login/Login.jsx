import { useState } from 'react'
import PropTypes from 'prop-types'
import './Login.css'
import WithLogging from '../HOC/WithLogging'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isFormValid = (email, password) => EMAIL_REGEX.test(email) && password.length >= 8

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChangeEmail = (event) => {
    const { value: email } = event.target
    setFormData({ ...formData, email })
    setEnableSubmit(isFormValid(email, formData.password))
  }

  const handleChangePassword = (event) => {
    const { value: password } = event.target
    setFormData({ ...formData, password })
    setEnableSubmit(isFormValid(formData.email, password))
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    logIn(formData.email, formData.password)
  }

  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
        />
        <input type="submit" value="OK" disabled={!enableSubmit} />
      </form>
    </div>
  )
}

Login.propTypes = {
  logIn: PropTypes.func,
}

export default WithLogging(Login)
