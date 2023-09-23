import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="header d-flex justify-content-between align-items-center p-2 px-5 mb-4 border-bottom border-1">
      <div className="logo">
        <Link to="/">Support Desk App</Link>
      </div>
      <ul className="d-flex my-auto">
        <li className="me-3">
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li className="me-3">
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
