import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Modal from "react-modal"
import { closeTicket, getTicket } from "../features/tickets/TicketSlice"
import {
  createNote,
  getNotes,
  reset as notesReset,
} from "../features/notes/NoteSlice"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useNavigate, useParams } from "react-router-dom"
import NoteItem from "../components/NoteItem"
import { FaPlus } from "react-icons/fa"

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    position: "relative",
  },
}
Modal.setAppElement("#root")

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [message, isError, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket Closed.")
    navigate("/tickets")
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()

    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  // Open / Close modal
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  if (isLoading || notesIsLoading) {
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

      <div className="notes-section">
        <h2>Notes</h2>

        {ticket.status !== "closed" && (
          <button className="btn btn-dark btn-md mb-2" onClick={openModal}>
            <FaPlus /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <div className="note-heading d-flex justify-content-between">
            <h3>Add Note</h3>
            <button className="btn-close" onClick={closeModal}></button>
          </div>

          <form onSubmit={onNoteSubmit}>
            <div className="form-group py-2">
              <textarea
                name="noteTex"
                id="noteText"
                className="form-control"
                placeholder="Note Text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-dark btn-md">Submit</button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
