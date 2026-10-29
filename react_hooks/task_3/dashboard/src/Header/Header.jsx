import { Fragment, useContext } from 'react'
import holbertonLogo from '../assets/holberton-logo.jpg'
import newContext from '../Context/context'
import './Header.css'

function Header() {
  const { user, logOut } = useContext(newContext)

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

export default Header
