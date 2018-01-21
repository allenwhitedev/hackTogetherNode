// -- setup
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const mongoUrl = process.env.MONGOURL || require('./config').mongoUrl

const cors = require('cors') 
app.use( cors() ) // Allow CORS because this is a hackathon app
const bodyParser = require('body-parser')
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: false}) )

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(mongoUrl, (err, database) =>
{
	if (err) return console.log(err)

	console.log('Successfully connected to mongo')
	gDb = database.db('hacktogether')

	gDb.collection('tests').find().toArray( (err, result) =>
  {
    if (err)
      return console.log(err)
    else
      console.log( 'result', result )   
  })  

})

app.listen(port, () => { console.log('Hack Together Node app running on port ' + port) } )	

// -- routes
app.get('/testDb', (req, res) =>
{
	gDb.collection('tests').find().toArray( (err, result) =>
	{
		if ( err ) 
			return console.log(err)
		else
			res.json(result)
	}) 
})
app.post('/testDb', (req, res) =>
{
	if ( req.body.message )
		gDb.collection('tests').insert(req.body, (err, result) =>
		{
			if ( err )
			{
				console.log(err)
				return res.status(500).send({message: err})
			}
			else
			{
				console.log('test message inserted successfully:', req.body.message)
				res.json(result)
			}
		})
	else
		res.status(400).send({message: 'Error: You must send a valid json body with a message value'})
})
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

// signup an user (only hacker type right now)
app.post('/signup', (req, res) =>
{
	switch (req.body.type)
	{
		case 'hacker':
			if ( req.body.email && req.body.firstName && req.body.lastName && req.body.school && req.body.employmentSeeking && req.body.resume && req.body.geolocation )
			{
				gDb.collection('hackers').insert({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, school: req.body.school, employmentSeeking: req.body.employmentSeeking, 
					resume: req.body.resume, jobPosition: req.body.jobPosition, geolocation: {longitude: req.body.longitude, latitude: req.body.latitude} }, (err, result) =>
				{
					if (err)
					{
						console.log(err)
						return res.status(500).send({message: 'Error: Could not insert user into database'})
					}
					else
						return res.json(result)
				})	
			}
			else
				res.status(400).send({message: 'Error: Signup requires an user type, email, resume, firstName, lastName, school, geolocation, and employmentSeeking'})	
			break
		case 'employer': 
			res.status(501).send({ message: 'Employer signup not yet implemented' })
			break
		case 'organizer':
			res.status(501).send({ message: 'Organizer signup not yet implemented' })
			break
	
		default:
			res.status(400).send('Error: Could not understand format of signup request (Are you sure you included a type?)')			
			break
	}
})