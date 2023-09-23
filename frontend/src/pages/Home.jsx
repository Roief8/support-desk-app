import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Choose from the options below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-outline-dark btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to="/new-ticket" className="btn btn-dark btn-block text-white">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home
