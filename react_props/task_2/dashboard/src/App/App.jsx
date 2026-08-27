import { Fragment } from 'react'
import './App.css'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import { getLatestNotification } from '../utils/utils.js'

function App() {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ]

  return (
    <Fragment>
      <Notifications notifications={notificationsList} />
      <Header />
      <Login />
      <Footer />
    </Fragment>
  )
}

export default App
