const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/eazyserv")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

require("dotenv").config();

// app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/review', require('./routes/review'))
app.use('/api/notification', require('./routes/notification'))
app.use('/api/booking', require('./routes/booking'))

app.listen(port, () => {
  console.log(`Eazyserv app listening on http://localhost:${port}`)
})
