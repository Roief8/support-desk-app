import { FaArrowAltCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export const BackButton = ({ url }) => {
  return (
    <Link
      to={url}
      className="btn btn-reverse btn-outline-dark btn-md d-flex w-25 align-items-center justify-content-center"
    >
      <FaArrowAltCircleLeft className="me-2" /> Back
    </Link>
  )
}

export default BackButton
