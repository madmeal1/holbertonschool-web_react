/* global process */
import { useCallback, useEffect, useReducer } from 'react'
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
import { APP_ACTIONS, appReducer, initialState } from './appReducer'

const logError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { displayDrawer, user, notifications, courses } = state

  // Notifications are needed as soon as the app loads
  useEffect(() => {
    let ignore = false

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('http://localhost:5173/notifications.json')
        if (!ignore) {
          dispatch({
            type: APP_ACTIONS.SET_NOTIFICATIONS,
            payload: data.map((notification) =>
              notification.id === 3
                ? { ...notification, html: { __html: getLatestNotification() } }
                : notification
            ),
          })
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
      return undefined
    }

    let ignore = false

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5173/courses.json')
        if (!ignore) {
          dispatch({ type: APP_ACTIONS.SET_COURSES, payload: data })
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
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } })
  }, [])

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT })
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`)
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id })
  }, [])

  const toggleDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER })
  }, [])

  return (
    <>
      <Notifications
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={toggleDrawer}
        handleHideDrawer={toggleDrawer}
      />
      <Header user={user} logOut={logOut} />
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
      <Footer user={user} />
    </>
  )
}

export default App
