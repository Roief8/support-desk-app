import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeTicket, getTicket, reset } from "../features/tickets/TicketSlice"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function Ticket() {
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { ticketId } = params

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [message, isError, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket Closed.")
    navigate("/tickets")
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong...</h3>
  }

  return (
    <div className="ticket-page text-start">
      <header className="ticket-header py-3">
        <BackButton url={"/tickets"} />
        <h2 className="d-flex justify-content-between align-items-center mt-4 mb-2">
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Product: {ticket.product}</h3>

        <hr />

        <div className="ticket-desc border rounded bg-light p-3">
          <h6>Description of the issue</h6>
          <p>{ticket.description}</p>
        </div>

        <div className="ticket-log d-flex justify-content-between mt-3">
          <h5>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
          </h5>
          {ticket.status === "closed" && (
            <h5>
              Closed On: {new Date(ticket.updatedAt).toLocaleString("en-US")}
            </h5>
          )}
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
