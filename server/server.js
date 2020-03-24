let express = require('express')
    bodyParser =  require('body-parser')
    cors = require('cors');
    //dbConn = require('./db/conn')

const app = express()
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())

var routes = require('./routes/route.js')

app.use('/', routes)

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
})