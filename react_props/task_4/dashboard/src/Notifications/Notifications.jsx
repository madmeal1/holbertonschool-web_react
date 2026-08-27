import PropTypes from 'prop-types'
import closeButton from '../assets/close-button.png'
import './Notifications.css'
import NotificationItem from './NotificationItem'

function Notifications({ notifications = [] }) {
  const handleCloseClick = () => {
    console.log('Close button has been clicked')
  }

  return (
    <div className="notification-items">
      <button
        aria-label="Close"
        onClick={handleCloseClick}
        style={{
          float: 'right',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <img src={closeButton} alt="close icon" width="12" height="12" />
      </button>

      <p>Here is the list of notifications</p>

      <ul>
        {notifications.map(({ id, type, html, value }) => (
          <NotificationItem key={id} type={type} html={html} value={value} />
        ))}
      </ul>
    </div>
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
}

export default Notifications
