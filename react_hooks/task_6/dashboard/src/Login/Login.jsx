import PropTypes from 'prop-types'
import './Login.css'
import WithLogging from '../HOC/WithLogging'
import useLogin from '../hooks/useLogin'

function Login({ logIn = () => {} }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin(logIn)

  return (
    <div className="App-body">
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={handleChangeEmail} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
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
