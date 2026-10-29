import PropTypes from 'prop-types'
import './Footer.css'
import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

function Footer({ user }) {
  return (
    <div className="App-footer">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user?.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  )
}

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
}

export default Footer
