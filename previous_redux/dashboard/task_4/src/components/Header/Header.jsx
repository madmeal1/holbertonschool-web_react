import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import holbertonLogo from '../../assets/holberton-logo.jpg'
import './Header.css'

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    if (event) event.preventDefault()
    dispatch(logout())
  }

  return (
    <Fragment>
      <div className="App-header">
        <img src={holbertonLogo} className="App-logo" alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      {isLoggedIn && (
        <section id="logoutSection">
          Welcome {user.email} (<a href="#" onClick={handleLogout}>logout</a>)
        </section>
      )}
    </Fragment>
  )
}

export default Header
