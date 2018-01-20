// -- setup
const express = require('express')
const app = express()
const port = process.env.PORT || 8000

const cors = require('cors') 
app.use( cors() ) // Allow CORS because this is a hackathon app
const bodyParser = require('body-parser')
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: false}) )

app.listen(port, () => { console.log('Hack Together Node app running on port ' + port) } )

// -- routes
app.get('/test', (req, res) =>
{
	console.log('Someone used GET on the /test route')
	res.send( { message: 'This is the json success message from the GET /test route' } )
})

app.post('/test', (req, res) =>
{
	console.log('Someone used POST on the /test route, here is the req.body.myKey ' + req.body.myKey )
	res.send( { message: `This is the json success message from the POST /test route, you sent body "${req.body.myKey}"` } )
})