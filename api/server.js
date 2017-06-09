const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');

//middleware
const authorize     = require('./middleware/authorize');

//application
const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.static(__dirname + './../build'));
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
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, authorization, location, user_id, id, rider1, rider2, rider3, rider4, rider5, rider6');
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

app.get('/rides/:id', (req, res) => {
    console.log(req.headers['id'])
    Ride.query({where: {id: req.headers['id']}})
        .fetchAll()
        .then(drive => {
            console.log(drive.models)
            res.send(drive.models)
        })
})

//POST endpoint for password encryption and creating user profiles
app.post('/encrypt',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let location = req.body.location;
    let phonenumber = req.body.phonenumber;
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
                        phonenumber: phonenumber,
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
                        let token = jwt.sign({id:user.attributes.id, location:user.attributes.location, username:username,lastname:user.attributes.lastname, firstname:user.attributes.firstname, phonenumber: user.attributes.phonenumber}, 'secretkey')
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
    let driver_name = req.body.driver_name;
    let driver_number = req.body.driver_number;
    let ride_city = req.body.ride_city;
    let pickup_location = req.body.pickup_location;
    let ski_destination = req.body.ski_destination;
    let room_available = req.body.room_available;
    let price_per = req.body.price_per;
    let vehicletype = req.body.vehicletype;
    let ride_time_location = req.body.ride_time_location;
    let ride_time = req.body.ride_time;
    let one_way = req.body.one_way;
    let spots_left = req.body.spots_left;

    const newRide = new Ride({
        user_id: user_id,
        driver_name: driver_name,
        driver_number: driver_number,
        ride_city: ride_city,
        pickup_location: pickup_location,
        ski_destination: ski_destination,
        room_available: room_available,
        price_per: price_per,
        vehicletype: vehicletype,
        ride_time_location: ride_time_location,
        ride_time: ride_time,
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
    let rider1_name = req.body.rider1_name;
    let rider1_phone = req.body.rider1_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider1:rider1, rider1_name:rider1_name, rider1_phone:rider1_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider1 = req.body.rider1;
        ride.attributes.rider1_name = req.body.rider1_name;
        ride.attributes.rider1_phone = req.body.rider1_phone;
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
    let rider2_name = req.body.rider2_name;
    let rider2_phone = req.body.rider2_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider2:rider2, rider2_name:rider2_name, rider2_phone:rider2_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider2 = req.body.rider2;
        ride.attributes.spots_left = req.body.spots_left;
        ride.attributes.rider2_name = req.body.rider2_name;
        ride.attributes.rider2_phone = req.body.rider2_phone;
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
    let rider3_name = req.body.rider3_name;
    let rider3_phone = req.body.rider3_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider3:rider3, rider3_name:rider3_name, rider3_phone:rider3_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider3 = req.body.rider3;
        ride.attributes.spots_left = req.body.spots_left;
        ride.attributes.rider3_name = req.body.rider3_name;
        ride.attributes.rider3_phone = req.body.rider3_phone;
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
    let rider4_name = req.body.rider4_name;
    let rider4_phone = req.body.rider4_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider4:rider4, rider4_name:rider4_name, rider4_phone:rider4_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider4 = req.body.rider4;
        ride.attributes.spots_left = req.body.spots_left;
        ride.attributes.rider4_name = req.body.rider4_name;
        ride.attributes.rider4_phone = req.body.rider4_phone;
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
    let rider5_name = req.body.rider5_name;
    let rider5_phone = req.body.rider5_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider5:rider5, rider5_name:rider5_name, rider5_phone:rider5_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider5 = req.body.rider5;
        ride.attributes.spots_left = req.body.spots_left;
        ride.attributes.rider5_name = req.body.rider5_name;
        ride.attributes.rider5_phone = req.body.rider5_phone;
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
    let rider6_name = req.body.rider6_name;
    let rider6_phone = req.body.rider6_phone;
    let spots_left = req.body.spots_left -1;
    

    Ride.where({id:req.body.id})
        .save({rider6:rider6, rider6_name:rider6_name, rider6_phone:rider6_phone, spots_left:spots_left}, {patch: true})
        .then(ride => {
        ride.attributes.rider6 = req.body.rider6;
        ride.attributes.spots_left = req.body.spots_left;
        ride.attributes.rider6_name = req.body.rider6_name;
        ride.attributes.rider6_phone = req.body.rider6_phone;
        console.log("HERE")
        console.log(ride.attributes);
    })
})
//GET endpoint for '/privatedata' goes here:

app.get('/private/drives', (req, res) => {
    console.log(req.headers['user_id']);
    Ride.query({where: {user_id: req.headers['user_id']}})
        .fetchAll()
        .then(drives => {
           res.send(drives.models)
       })
})

app.get('/private/rides', (req, res) => {
    const uId = req.headers['rider1'];
    Ride
        .fetchAll()
        .then(rides => {
            // res.send(rides.models)
            const riderArr = rides.models.filter((el)=>{
                if(el.attributes.rider1 == uId || el.attributes.rider2 == uId || el.attributes.rider3 == uId || el.attributes.rider4 == uId || el.attributes.rider5 == uId || el.attributes.rider6 == uId){
                    return el
                }
            })
            console.log(riderArr);
            res.send(riderArr);
            // console.log(rides.models)
        })
})

app.get('/privatepage', authorize, (req,res) => {
    console.log(req.decoded)
    res.json(req.decoded)
});  

app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + './../build'});
});

app.listen(PORT, () => {
   console.log('Server running on:' + PORT);
   console.log('Kill server with CTRL + C');
});