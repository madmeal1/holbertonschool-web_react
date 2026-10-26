import { Component } from 'react'
import PropTypes from 'prop-types'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem'

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    )
  }

  handleCloseClick = () => {
    console.log('Close button has been clicked')
    this.props.handleHideDrawer()
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
  }

  render() {
    const { notifications, displayDrawer, handleDisplayDrawer } = this.props

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
                  onClick={this.handleCloseClick}
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
                      markAsRead={this.markAsRead}
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
}

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
}

export default Notifications
