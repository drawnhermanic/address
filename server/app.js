const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})

const config = require('./config')
const mongoose = require('mongoose')

const { db: { host, port, name, username, password } } = config
const connectionString = `mongodb://${username}:${password}@${host}:${port}/${name}`

var options = {  
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  useNewUrlParser: true
}

mongoose.connect(connectionString, options)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')

  app.listen(app.get('port'), function () {
    console.log('API Server Listening on port ' + app.get('port') + '!')
  })
})
