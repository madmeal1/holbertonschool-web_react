import { Component } from 'react'
import './App.css'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'
import Footer from '../Footer/Footer'
import BodySection from '../BodySection/BodySection'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import { getLatestNotification } from '../utils/utils.js'
import newContext from '../Context/context'

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
}

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
]

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayDrawer: false,
      user: { ...defaultUser },
      logOut: this.logOut,
      notifications: notificationsList,
      courses: coursesList,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && 'key' in event && event.key.toLowerCase() === 'h') {
      event.preventDefault()
      alert('Logging you out')
      this.state.logOut()
    }
  }

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    })
  }

  logOut = () => {
    this.setState({ user: { ...defaultUser } })
  }

  // Keep the same provider value reference until user or logOut actually change
  getContextValue() {
    const { user, logOut } = this.state
    if (!this.contextValue || this.contextValue.user !== user || this.contextValue.logOut !== logOut) {
      this.contextValue = { user, logOut }
    }
    return this.contextValue
  }

  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter((notification) => notification.id !== id),
    }))
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true })
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false })
  }

  render() {
    const { displayDrawer, user, notifications, courses } = this.state

    return (
      <newContext.Provider value={this.getContextValue()}>
        <Notifications
          notifications={notifications}
          markNotificationAsRead={this.markNotificationAsRead}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
        />
        <Header />
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={this.logIn} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
        <Footer />
      </newContext.Provider>
    )
  }
}

export default App
