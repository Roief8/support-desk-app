import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  createTicket,
  getTickets,
  reset,
} from "../features/tickets/TicketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )

  const [product, setProduct] = useState("iPhone")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate("/tickets")
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">
            Customer Name
          </label>
          <input
            className="form-control"
            type="text"
            value={user.name}
            placeholder={user.name}
            disabled
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Customer Email
          </label>
          <input
            className="form-control"
            type="text"
            value={user.email}
            placeholder={user.email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product" className="form-label">
              Select Product
            </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
              <option value="MacBook">MacBook</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description of the issue
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group pb-4">
            <button className="btn btn-block btn-dark">
              Submit New Ticket
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
