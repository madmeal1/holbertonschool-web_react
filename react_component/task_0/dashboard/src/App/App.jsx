import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'
import Footer from '../Footer/Footer'
import { getLatestNotification } from '../utils/utils.js'

class App extends Component {
  render() {
    const { isLoggedIn } = this.props

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

    return (
      <Fragment>
        <Notifications notifications={notificationsList} displayDrawer={true} />
        <Header />
        {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
        <Footer />
      </Fragment>
    )
  }
}

App.defaultProps = {
  isLoggedIn: false,
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
}

export default App
