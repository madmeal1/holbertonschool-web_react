import { Component } from 'react'
import PropTypes from 'prop-types'
import './Login.css'
import WithLogging from '../HOC/WithLogging'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

class Login extends Component {
  constructor(props) {
    super(props)
    const { email, password } = props
    this.state = {
      email,
      password,
      enableSubmit: this.isFormValid(email, password),
    }
  }

  isFormValid = (email, password) => EMAIL_REGEX.test(email) && password.length >= 8

  handleLoginSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.logIn(email, password)
  }

  handleChangeEmail = (event) => {
    const email = event.target.value
    this.setState((prevState) => ({
      email,
      enableSubmit: this.isFormValid(email, prevState.password),
    }))
  }

  handleChangePassword = (event) => {
    const password = event.target.value
    this.setState((prevState) => ({
      password,
      enableSubmit: this.isFormValid(prevState.email, password),
    }))
  }

  render() {
    const { email, password, enableSubmit } = this.state

    return (
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <input type="submit" value="OK" disabled={!enableSubmit} />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
}

Login.defaultProps = {
  logIn: () => {},
  email: '',
  password: '',
}

export default WithLogging(Login)
