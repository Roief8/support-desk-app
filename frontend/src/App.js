import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "react-toastify/dist/ReactToastify.min.css"

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}
export default App
