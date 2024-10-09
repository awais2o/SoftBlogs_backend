const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()

app.use(express.json())

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

//routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.get('/', (req, res) => {
  res.send('Blog Post API is running')
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.log(err))
