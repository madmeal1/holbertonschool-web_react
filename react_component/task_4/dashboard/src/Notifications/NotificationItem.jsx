import { Component } from 'react'
import PropTypes from 'prop-types'

class NotificationItem extends Component {
  handleClick = () => {
    const { id, markAsRead } = this.props
    markAsRead(id)
  }

  render() {
    const { type = 'default', html, value } = this.props
    const style = { color: type === 'urgent' ? 'red' : 'blue' }

    if (html) {
      return (
        <li
          style={style}
          data-notification-type={type}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        />
      )
    }

    return (
      <li style={style} data-notification-type={type} onClick={this.handleClick}>
        {value}
      </li>
    )
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
}

NotificationItem.defaultProps = {
  markAsRead: () => {},
}

export default NotificationItem
