import closeButton from '../assets/close-button.png'
import './Notifications.css'
import { getLatestNotification } from '../utils/utils.js'

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  )
}

export default Notifications
