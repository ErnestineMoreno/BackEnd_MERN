const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jobController = require('./controllers/jobs')

// Instantiate express application object
const app = express()

// The `.use` method sets up middleware in Express

// Set up cors middleware and make sure that it
// comes before our routes are used.
app.use(cors())

// Add `express.json` middleware which will
// parse JSON requests into JS objects before
// they reach the route files.
app.use(express.json())

// The urlencoded middleware parses requests which use
// a specific content type (such as when using Axios)
app.use(express.urlencoded({ extended: true }))

// Configure the route middleware
app.use('/api/jobs', jobController)

// The last middleware receives any error as its first argument
app.use((err, req, res, next) => {
  // If the error contains a statusCode, set the variable to that code
  // if not, set it to a default 500 code
  const statusCode = err.statusCode || 500
  // If the error contains a message, set the variable to that message
  // if not, set it to a generic 'Internal Server Error'
  const message = err.message || 'Internal Server Error'
  // Set the status and send the message as a response to the client
  res.status(statusCode).send(message)
})

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
app.set('port', process.env.PORT || 4000)
// Run server on designated port
app.listen(app.get('port'), () => {
  console.log('listening on port ' + app.get('port'))
})
