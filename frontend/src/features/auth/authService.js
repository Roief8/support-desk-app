import axios from "axios"

const BASE_URL = "http://ec2-3-69-231-47.eu-central-1.compute.amazonaws.com"
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
  const response = await axios.post(API_URL + "login", userData)
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
