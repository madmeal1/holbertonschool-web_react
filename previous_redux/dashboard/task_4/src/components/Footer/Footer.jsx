import { useSelector } from 'react-redux'
import './Footer.css'
import { getCurrentYear, getFooterCopy } from '../../utils/utils.js'

function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="App-footer">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {isLoggedIn && user && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  )
}

export default Footer
