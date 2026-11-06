import { memo } from 'react'
import PropTypes from 'prop-types'

function NotificationItem({ id, type = 'default', html, value, markAsRead = () => {} }) {
  const handleClick = () => {
    markAsRead(id)
  }

  const colorClass =
    type === 'urgent'
      ? 'text-[var(--urgent-notification-item)]'
      : 'text-[var(--default-notification-item)]'

  if (html) {
    return (
      <li
        className={colorClass}
        data-notification-type={type}
        onClick={handleClick}
        dangerouslySetInnerHTML={html}
      />
    )
  }

  return (
    <li className={colorClass} data-notification-type={type} onClick={handleClick}>
      {value}
    </li>
  )
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
}

export default memo(NotificationItem)
