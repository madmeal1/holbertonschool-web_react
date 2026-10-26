import { Component, Fragment } from 'react'
import holbertonLogo from '../assets/holberton-logo.jpg'
import newContext from '../Context/context'
import './Header.css'

class Header extends Component {
  static contextType = newContext

  handleLogOutClick = (event) => {
    event.preventDefault()
    this.context.logOut()
  }

  render() {
    const { user } = this.context

    return (
      <Fragment>
        <div className="App-header">
          <img src={holbertonLogo} className="App-logo" alt="holberton logo" />
          <h1>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection">
            Welcome {user.email} (<a href="#" onClick={this.handleLogOutClick}>logout</a>)
          </section>
        )}
      </Fragment>
    )
  }
}

export default Header
