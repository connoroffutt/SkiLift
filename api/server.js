const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');

//middleware
const authorize     = require('./middleware/authorize');

//application
const app = express();
const PORT = 3005;
app.use(bodyParser.json());

const knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : 'postgres',
        database : 'skuberdb',
        charset  : 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
    tableName: 'users'
})

const Ride = bookshelf.Model.extend({
    tableName: 'rides'
})
//defines which origins and headers are permitted

app.use((req, res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, authorization, location');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

app.get('/', (req,res) => {
    console.log(req.headers['location'])
    Ride.query({where: {ride_city: req.headers['location']}})
        .fetchAll()
        .then(rides => {
           res.send(rides.models)
           console.log(rides.models)
       })
});

app.get('/login', (req, res)=> {

});

//POST endpoint for password encryption and creating user profiles
app.post('/encrypt',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let location = req.body.location;
    let usertype = req.body.usertype;
    let vehicletype = req.body.vehicletype;
    let licensenumber = req.body.licensenumber;
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log(err);
                // ======= TO BECOME DATABASE OPERATION ========
                    const newUser = new User({
                        username: username,
                        password: hash,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        location: location,
                        usertype: usertype,
                        vehicletype: vehicletype,
                        licensenumber: licensenumber
                    });

                    newUser.save().then(user => {
                        res.send(user.attributes);
                        console.log(user.attributes);
                    });
                // ======= END DATABASE OPERATIONS =========
            });
        });


});

//POST endpoint for logging in to the server
app.post('/login', (req,res) => {
    console.log('we made it')
    let username = req.body.username;
    let password = req.body.password;
     User.where({username: username})
        .fetch()
        .then(user => {
            if (user !== null) {
                bcrypt.compare(password, user.attributes.password, (err, result) => {
                    if (result){
                        let token = jwt.sign({id:user.attributes.id, location:user.attributes.location, username:username,lastname:user.attributes.lastname, firstname:user.attributes.firstname}, 'secretkey')
                        res.json({token:token})
                        console.log(token)
                    } else {
                        res.status(403)
                        .send({token:null})
                    }
                })
            } else {
                res.status(403)
                .send({token:null})
            }
        });      
    })


app.post('/newride', (req,res) => {
    let user_id = req.body.user_id;
    let ride_city = req.body.ride_city;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let vehicletype = req.body.vehicletype;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let spots_left = req.body.spots_left;

    const newRide = new Ride({
        user_id: user_id,
        ride_city: ride_city,
        pickup_location: pickup_location,
        ski_destination: ski_destination,
        room_available: room_available,
        price_per: price_per,
        vehicletype: vehicletype,
        ride_time_location: ride_time_location,
        one_way: one_way,
        spots_left: spots_left
    })
    newRide.save().then(ride => {
        res.send(ride.attributes);
        console.log(ride.attributes);
    });
})

app.put('/rides1/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider1 = req.body.rider1;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider1:rider1, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider1 = req.body.rider1;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log(ride.attributes);
    })
})

app.put('/rides2/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider2 = req.body.rider2;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider2:rider2, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider2 = req.body.rider2;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log(ride.attributes);
    })
})

app.put('/rides3/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider3 = req.body.rider3;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider3:rider3, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider3 = req.body.rider3;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log(ride.attributes);
    })
})

app.put('/rides4/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider4 = req.body.rider4;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider4:rider4, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider4 = req.body.rider4;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log( ride.attributes);
    })
})

app.put('/rides5/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider5 = req.body.rider5;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider5:rider5, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider5 = req.body.rider5;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log(ride.attributes);
    })
})

app.put('/rides6/:id', (req, res) => {
    let id = req.body.id;
    let ride_city = req.body.ride_city;
    let user_id = req.body.user_id;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let ride_time_location = req.body.ride_time_location;
    let one_way = req.body.one_way;
    let vehicletype = req.body.vehicletype;
    let rider6 = req.body.rider6;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider6:rider6, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider6 = req.body.rider6;
        ride.attributes.spots_left = req.body.spots_left;
        console.log("HERE")
        console.log(ride.attributes);
    })
})
//GET endpoint for '/privatedata' goes here:

app.get('/private', authorize, (req,res) => {
    console.log("LOG" + req.decoded)
    res.json(req.decoded)
});  



app.listen(PORT, () => {
    console.log('Server Started on http://localhost:%s',PORT);
    console.log('Press CTRL + C to stop server');
});