// -- setup
const express = require('express')
const mongoClient = require('mongodb').MongoClient
const app = express()
const port = process.env.PORT || 8000
const mongoUrl = process.env.MONGOURL || require('./config').mongoUrl

// const cors = require('cors')
// app.use( cors() ) // Allow CORS because this is a hackathon app
// const bodyParser = require('body-parser')
// app.use( bodyParser.json() )
// app.use( bodyParser.urlencoded({extended: false}) )

// var dbUrl = "mongodb://admin:htproject@ds243345.mlab.com:43345/hacktogether";

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
<<<<<<< HEAD
		if ( err )
			return console.log(err)
		else
			res.json(result)
	})
=======
		if ( err ) 
			return console.log(err)
		else
			res.json(result)
	}) 
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
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
<<<<<<< HEAD

=======
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
app.get('/test', (req, res) =>
{
	console.log('Someone used GET on the /test route')
	res.send( { message: 'This is the json success message from the GET /test route' } )
})
<<<<<<< HEAD

// app.post('/test', (req, res) =>
// {
// 	console.log('Someone used POST on the /test route, here is the req.body.myKey ' + req.body.myKey )
// 	res.send( { message: `This is the json success message from the POST /test route, you sent body "${req.body.myKey}"` } )
// })

// app.get('/employers/getHackathonInterest', (req, res) => {
//   mongoClient.connect(dbUrl, function(err, db) {
//     var dbo = db.db("hacktogether");
//
//     var results = dbo.collection("hackers").aggregate({
//       "$group": {
//         "_id": "$jobPosition",
//         "totalEntries": {"$sum": 1}
//       }
//     }).toArray();
//
//     console.log(results);
//   })
// })

app.get('/employers/getHackathonParticipantJobInterest', (req, res) => {
  var numberOfParticipants = 300;
  var a = Math.floor(Math.random() * 61);
  var b = Math.floor(Math.random() * 61);
  var c = Math.floor(Math.random() * 61);
  var d = Math.floor(Math.random() * 61);
  var e = 0;

  numberOfParticipants -= a;
  numberOfParticipants -= b;
  numberOfParticipants -= c;
  numberOfParticipants -= d;
  e = numberOfParticipants;

  res.send({
    data: {
      "Software Developer": a,
      "Data Scientist": b,
      "Systems Engineer": c,
      "Machine Learning Engineer": d,
      "Computer Vision Architect": e
    }
  })
})

=======
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
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
<<<<<<< HEAD
				gDb.collection('hackers').insert({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, school: req.body.school, employmentSeeking: req.body.employmentSeeking,
=======
				gDb.collection('hackers').insert({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, school: req.body.school, employmentSeeking: req.body.employmentSeeking, 
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
					resume: req.body.resume, jobPosition: req.body.jobPosition, geolocation: {longitude: req.body.geolocation.longitude, latitude: req.body.geolocation.latitude} }, (err, result) =>
				{
					if (err)
					{
						console.log(err)
						return res.status(500).send({message: 'Error: Could not insert user into database'})
					}
					else
						return res.json(result)
<<<<<<< HEAD
				})
			}
			else
				res.status(400).send({message: 'Error: Signup requires an user type, email, resume, firstName, lastName, school, geolocation, and employmentSeeking'})
			break
		case 'employer':
=======
				})	
			}
			else
				res.status(400).send({message: 'Error: Signup requires an user type, email, resume, firstName, lastName, school, geolocation, and employmentSeeking'})	
			break
		case 'employer': 
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
			res.status(501).send({ message: 'Employer signup not yet implemented' })
			break
		case 'organizer':
			res.status(501).send({ message: 'Organizer signup not yet implemented' })
			break
<<<<<<< HEAD

		default:
			res.status(400).send('Error: Could not understand format of signup request (Are you sure you included a type?)')
			break
	}
})
=======
	
		default:
			res.status(400).send('Error: Could not understand format of signup request (Are you sure you included a type?)')			
			break
	}
})
>>>>>>> c9651e31fe2369413c0085db44b06fc25eb0b5f9
