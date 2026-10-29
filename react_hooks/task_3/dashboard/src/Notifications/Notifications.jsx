import { memo } from 'react'
import PropTypes from 'prop-types'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem'

const noop = () => {}

function Notifications({
  notifications = [],
  displayDrawer = false,
  handleDisplayDrawer = noop,
  handleHideDrawer = noop,
  markNotificationAsRead = noop,
}) {
  const handleCloseClick = () => {
    console.log('Close button has been clicked')
    handleHideDrawer()
  }

  return (
    <>
      <div className="notification-title text-right cursor-pointer" onClick={handleDisplayDrawer}>
        Your notifications
      </div>

      {displayDrawer && (
        <div className="notification-items relative w-1/4 ml-auto p-1.5 border-2 border-dashed border-[var(--main-color)]">
          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <button
                aria-label="Close"
                onClick={handleCloseClick}
                className="float-right p-0 border-none bg-transparent cursor-pointer"
              >
                <img src={closeButton} alt="close icon" width="12" height="12" />
              </button>

              <p>Here is the list of notifications</p>

              <ul>
                {notifications.map(({ id, type, html, value }) => (
                  <NotificationItem
                    key={id}
                    id={id}
                    type={type}
                    html={html}
                    value={value}
                    markAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
      value: PropTypes.string,
    })
  ),
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
}

// Returning true skips the render: only re-render when the drawer toggles or the list length changes
export const areNotificationsPropsEqual = (prevProps, nextProps) =>
  prevProps.displayDrawer === nextProps.displayDrawer &&
  (prevProps.notifications || []).length === (nextProps.notifications || []).length

export default memo(Notifications, areNotificationsPropsEqual)
