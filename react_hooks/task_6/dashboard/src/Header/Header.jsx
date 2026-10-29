import { Fragment } from 'react'
import PropTypes from 'prop-types'
import holbertonLogo from '../assets/holberton-logo.jpg'
import './Header.css'

const defaultUser = { email: '', password: '', isLoggedIn: false }

function Header({ user = defaultUser, logOut = () => {} }) {
  const handleLogOutClick = (event) => {
    event.preventDefault()
    logOut()
  }

  return (
    <Fragment>
      <div className="App-header">
        <img src={holbertonLogo} className="App-logo" alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <section id="logoutSection">
          Welcome {user.email} (<a href="#" onClick={handleLogOutClick}>logout</a>)
        </section>
      )}
    </Fragment>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  logOut: PropTypes.func,
}

export default Header
