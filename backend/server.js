const express = require("express")
var https = require("https")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
let options = { key: "../key.pem", cert: "../server.crt" }
https.createServer(options, app).listen(443)

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello, Welcome to support desk api. we use api/users in order to register and login users to app.",
  })
})

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
