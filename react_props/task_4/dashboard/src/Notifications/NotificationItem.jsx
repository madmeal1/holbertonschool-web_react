import PropTypes from 'prop-types'

function NotificationItem({ type = 'default', html, value }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue' }

  if (html) {
    return (
      <li
        style={style}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
      />
    )
  }

  return (
    <li style={style} data-notification-type={type}>
      {value}
    </li>
  )
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
}

export default NotificationItem
