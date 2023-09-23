import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { register } from "../features/auth/authSlice"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
  })

  const { name, email, password, passwordVerify } = formData

  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    // Password Verification
    if (password.length < 8) {
      toast.error("Password must contain at least 8 letters")
    } else if (password !== passwordVerify) {
      toast.error("passwords do not match")
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register {user}
        </h1>
        <p>create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordVerify"
              name="passwordVerify"
              value={passwordVerify}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-dark ">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
