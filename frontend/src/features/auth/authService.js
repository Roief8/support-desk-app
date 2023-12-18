import axios from "axios"

const BASE_URL = "ec2-18-159-112-130.eu-central-1.compute.amazonaws.com:5000"
const API_URL = "/api/users/"

// Register user
const register = async (userData) => {
  const response = await axios.post(BASE_URL + API_URL, userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(BASE_URL, userData, {
    headers: "Access-Control-Allow-Origin: *",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  })
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// logout user
const logout = () => localStorage.removeItem("user")

const authService = {
  register,
  logout,
  login,
}

export default authService
