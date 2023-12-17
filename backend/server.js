const express = require("express")
const https = require("https")
const fs = require("fs")
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
var options = {
  key: fs.readFileSync("key.pem", "utf8"),
  cert: fs.readFileSync("server.crt", "utf8"),
}

https.createServer(options, app).listen(443, () => {
  "server started https."
})

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
