/* global process */
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'
import Footer from '../Footer/Footer'
import BodySection from '../BodySection/BodySection'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import { getLatestNotification } from '../utils/utils.js'
import newContext, { user as defaultUser } from '../Context/context'

const logError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
}

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true)
  const [user, setUser] = useState({ ...defaultUser })
  const [notifications, setNotifications] = useState([])
  const [courses, setCourses] = useState([])

  // Notifications are needed as soon as the app loads
  useEffect(() => {
    let ignore = false

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('http://localhost:5173/notifications.json')
        if (!ignore) {
          setNotifications(
            data.map((notification) =>
              notification.id === 3
                ? { ...notification, html: { __html: getLatestNotification() } }
                : notification
            )
          )
        }
      } catch (error) {
        logError(error)
      }
    }

    fetchNotifications()

    return () => {
      ignore = true
    }
  }, [])

  // Courses depend on the authenticated user: only fetch them once logged in
  useEffect(() => {
    if (!user.isLoggedIn) {
      setCourses([])
      return undefined
    }

    let ignore = false

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5173/courses.json')
        if (!ignore) {
          setCourses(data)
        }
      } catch (error) {
        logError(error)
      }
    }

    fetchCourses()

    return () => {
      ignore = true
    }
  }, [user])

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true })
  }, [])

  const logOut = useCallback(() => {
    setUser({ ...defaultUser })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`)
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }, [notifications])

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true)
  }, [])

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false)
  }, [])

  // Keep the same provider value reference until user actually changes
  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut])

  return (
    <newContext.Provider value={contextValue}>
      <Notifications
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
      <Header />
      {user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={courses} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={logIn} />
        </BodySectionWithMarginBottom>
      )}
      <BodySection title="News from the School">
        <p>Holberton School News goes here</p>
      </BodySection>
      <Footer />
    </newContext.Provider>
  )
}

export default App
