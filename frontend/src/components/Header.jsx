import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout, reset } from "../features/auth/authSlice"

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }
  return (
    <header className="header d-flex justify-content-between align-items-center p-2 px-5 mb-4 border-bottom border-1">
      <div className="logo">
        <Link to="/">Support Desk App</Link>
      </div>
      <ul className="d-flex my-auto">
        {user ? (
          <button className="btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
