import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

class NewHome extends Component {
  constructor(){
    super();

    this.state = {search_location:null};
    this.locationTxtFieldChange = this.locationTxtFieldChange.bind(this);
    this.searchLocationSubmit = this.searchLocationSubmit.bind(this);
  }

  locationTxtFieldChange(e){
    e.preventDefault();
    if(e.target.name === "search_location"){
        this.state.search_location = e.target.value;
    }
  }

  searchLocationSubmit(e){
    e.preventDefault();
    localStorage.search_location = this.state.search_location;
    window.location.href = '/home';
  }



  render(){
    return(
      <div className="new-home">
      <div className="container">
        <h1 className="new-home-header text-center"> Welcome to SkiLift </h1>
        <p className="new-home-header text-center"> Connect and share rides with skiers and snowboarders in your community. </p>
      </div>
        <form onSubmit={this.searchLocationSubmit}>
          <div className="form-group newhome">
            <input 
              onChange={this.locationTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Find a SkiLift in..." 
              name="search_location" />
          </div>
        </form>
      </div>
    )
  }

}

class Home extends Component {
  constructor(){
    super();
      this.state = {ride:null};

      this.reserveRide = this.reserveRide.bind(this);
      this.viewRideLocalStore = this.viewRideLocalStore.bind(this);
  }

  componentDidMount(){
    let self = this;
    axios.get('/api/', {headers:{'location':localStorage.search_location}})
      .then(function (response) {
        console.log(response.data);
        console.log(self)
        self.setState({
          ride: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(localStorage)
  }

  viewRideLocalStore(id){
    localStorage.ride_id = id;
  }


  reserveRide(ride, user_ID) {
      
      const putURL1 = '/api/rides1/' + ride.id;
      const putURL2 = '/api/rides2/' + ride.id;
      const putURL3 = '/api/rides3/' + ride.id;
      const putURL4 = '/api/rides4/' + ride.id;
      const putURL5 = '/api/rides5/' + ride.id;
      const putURL6 = '/api/rides6/' + ride.id;

      let reserveRideData1 = {
        id: ride.id,
        rider1: user_ID,
        rider1_name: localStorage.name,
        rider1_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData2 = {
        id: ride.id,
        rider2: user_ID,
        rider2_name: localStorage.name,
        rider2_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData3 = {
        id: ride.id,
        rider3: user_ID,
        rider3_name: localStorage.name,
        rider3_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData4 = {
        id: ride.id,
        rider4: user_ID,
        rider4_name: localStorage.name,
        rider4_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData5 = {
        id: ride.id,
        rider5: user_ID,
        rider5_name: localStorage.name,
        rider5_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData6 = {
        id: ride.id,
        rider6: user_ID,
        rider6_name: localStorage.name,
        rider6_phone: localStorage.phone,
        spots_left: ride.spots_left
      }
  
    if (ride.rider1 === null && ride.rider2 === null && ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 1){
      axios.put(putURL1, reserveRideData1)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider2 === null && ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 2){
      axios.put(putURL2, reserveRideData2)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 3){
      axios.put(putURL3, reserveRideData3)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 4){
      axios.put(putURL4, reserveRideData4)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider5 === null && ride.rider6 === null && ride.room_available >= 5){
      axios.put(putURL5, reserveRideData5)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider6 === null && ride.room_available === 6){
      axios.put(putURL6, reserveRideData6)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }          
  }

  render(){
    let ride = []; 
    if (this.state.ride !== null) {
      for (let i = 0; i < this.state.ride.length; i++){
      ride.push(<ul className="thumbnail" key={i}>
                  <li> {this.state.ride[i].pickup_location}    </li>
                  <li> {this.state.ride[i].ski_destination}    </li>
                  <li>${this.state.ride[i].price_per} Per Person</li>
                  <li> {this.state.ride[i].vehicletype}        </li>
                  <li> {this.state.ride[i].ride_time_location} </li>
                  <li> {this.state.ride[i].one_way === true ? 'One-Way Trip (Ride Back Not Included/Available)' : 'Two-Way Trip'}</li>
                  <li> {this.state.ride[i].spots_left} Spots Left</li>
                   <button className={this.state.ride[i].spots_left === 0 || localStorage.length < 2 ? "btn btn-primary hidden" : "btn btn-primary show"} disabled={this.state.ride[i].spots_left === 0 || localStorage.length < 2 ? true : false} onClick={()=>{this.reserveRide(this.state.ride[i], localStorage.userID)}}>Reserve a spot now!</button>
                   <a className="btn btn-primary" href={"/rides/"+this.state.ride[i].id} onClick={()=>{this.viewRideLocalStore(this.state.ride[i].id)}}>View Ride</a>
                </ul>
                

      )}
    }
    return(
      <div>
          <h1 className="text-center page-head"> Upcoming SkiLift Rides in {localStorage.search_location}</h1>
         {ride}
      </div>
    )
  }
}

class Login extends Component {
  constructor(){
    super();
    this.state = {username:null,email:null,password:null,firstname:null,lastname:null,location:null,usertype:null,vehicletype:null,licensenumber:null,warning:'no-warning'};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    let self = this;
    e.preventDefault();
    axios
      .post('/api/login', this.state)
      .then((res) => {
        console.log(res);
        localStorage.authToken = res.data.token;
        window.location.href = "/private";
      })
      .catch(()=>{
          self.setState({
            warning:' '
          })
          console.log(this.state.warning)
      })
  }

  txtFieldChange(e){
    if(e.target.name === "username"){this.state.username = e.target.value}
    else if(e.target.name === "email"){this.state.email = e.target.value}
    else if(e.target.name === "password"){this.state.password = e.target.value}
    else if(e.target.name === "firstname"){this.state.firstname = e.target.value}
    else if(e.target.name === "lastname"){this.state.lastname = e.target.value}
    else if(e.target.name === "location"){this.state.location = e.target.value}
    else if(e.target.name === "usertype"){this.state.usertype = e.target.value}

    this.setState({
      username:this.state.username,
      email:this.state.email,
      password:this.state.password,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      location:this.state.location,
      usertype:this.state.usertype
    });
  }

  render() {
    return (
      <div id="auth">
        <h1 className="page-head">Sign In</h1>
        <p className="alert alert-danger ">{this.state.warning === 'no-warning' ? 'Please Log In.' : 'Incorrect Password, Try Again.'}</p>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

class RidePage extends Component {
  constructor(){
    super();

    this.state = {singleride:null};
  }

  reserveRide(ride, user_ID) {
      
      const putURL1 = '/api/rides1/' + ride.id;
      const putURL2 = '/api/rides2/' + ride.id;
      const putURL3 = '/api/rides3/' + ride.id;
      const putURL4 = '/api/rides4/' + ride.id;
      const putURL5 = '/api/rides5/' + ride.id;
      const putURL6 = '/api/rides6/' + ride.id;

      let reserveRideData1 = {
        id: ride.id,
        rider1: user_ID,
        rider1_name: localStorage.name,
        rider1_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData2 = {
        id: ride.id,
        rider2: user_ID,
        rider2_name: localStorage.name,
        rider2_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData3 = {
        id: ride.id,
        rider3: user_ID,
        rider3_name: localStorage.name,
        rider3_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData4 = {
        id: ride.id,
        rider4: user_ID,
        rider4_name: localStorage.name,
        rider4_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData5 = {
        id: ride.id,
        rider5: user_ID,
        rider5_name: localStorage.name,
        rider5_phone: localStorage.phone,
        spots_left: ride.spots_left
      }

      let reserveRideData6 = {
        id: ride.id,
        rider6: user_ID,
        rider6_name: localStorage.name,
        rider6_phone: localStorage.phone,
        spots_left: ride.spots_left
      }
  
    if (ride.rider1 === null && ride.rider2 === null && ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 1){
      axios.put(putURL1, reserveRideData1)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider2 === null && ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 2){
      axios.put(putURL2, reserveRideData2)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider3 === null && ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 3){
      axios.put(putURL3, reserveRideData3)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider4 === null && ride.rider5 === null && ride.rider6 === null && ride.room_available >= 4){
      axios.put(putURL4, reserveRideData4)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider5 === null && ride.rider6 === null && ride.room_available >= 5){
      axios.put(putURL5, reserveRideData5)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }
    else if (ride.rider6 === null && ride.room_available === 6){
      axios.put(putURL6, reserveRideData6)
           .then((res)=>{
             console.log(res.data)
         }).catch(error => {
             console.log(error)
         })
    }          
  }

  componentWillMount(){
    axios
      .get('/api/'+localStorage.ride_id, {headers:{'id':localStorage.ride_id}})
      .then(response => {
        console.log(response.data)
          this.setState({
            singleride: response.data
          })
      })
      .catch(function(error){
        console.log(error)
      })
  }
  render(){
    let singleRide = [];
    if (this.state.singleride !== null){
      for(let i=0; i < this.state.singleride.length; i++) {
        singleRide.push(
          <ul>
                  <li> {this.state.singleride[i].pickup_location}    </li>
                  <li> {this.state.singleride[i].ski_destination}    </li>
                  <li>${this.state.singleride[i].price_per} Per Person</li>
                  <li> {this.state.singleride[i].vehicletype}        </li>
                  <li> {this.state.singleride[i].ride_time_location} </li>
                  <li> {this.state.singleride[i].one_way === true ? 'One-Way Trip (Ride Back Not Included/Available)' : 'Two-Way Trip'}</li>
                  <li> {this.state.singleride[i].spots_left} Spots Left</li>
                  <button className="btn btn-primary" disabled={this.state.singleride[i].spots_left === 0 ? true : false} onClick={()=>{this.reserveRide(this.state.singleride[i], localStorage.userID)}}>Reserve a spot now!</button>
          </ul>
        )
      }
      
    // console.log(this.state.singleride)
    }
    return(
      <div>
        <h1> SkiLift Ride</h1>
          {singleRide}
      </div>
    )
  }
}

class NewRide extends Component {
  constructor(){
    super();
    this.state = {user_id:null,driver_name:null,ride_city:null,one_way:false,pickup_location:null,ski_destination:null,room_available:null,price_per:null,vehicletype:null,ride_time_location:null,rider1:null,rider2:null,rider3:null,rider4:null,rider5:null,rider6:null,spots_taken:null};
  
    this.newRideSubmit = this.newRideSubmit.bind(this);
    this.rideTxtFieldChange = this.rideTxtFieldChange.bind(this);
  }

  newRideSubmit(e){
    e.preventDefault();
    axios
      .post('/api/newride',this.state)
      .then( (res) =>{
        console.log(res);
      })
      window.location.href = '/'
  }

  rideTxtFieldChange(e){
    if(e.target.name === "pickup_location"){
        this.state.pickup_location = e.target.value;
    }
    else if(e.target.name === "ride_city"){
        this.state.ride_city = e.target.value;
    }
    else if(e.target.name === "ski_destination"){
        this.state.ski_destination = e.target.value;
    }
    else if(e.target.name === "room_available"){
        this.state.room_available = e.target.value;
        this.state.spots_left = e.target.value;
    }
    else if(e.target.name === "price_per"){
        this.state.price_per = e.target.value;
    }
    else if(e.target.name === "vehicletype"){
        this.state.vehicletype = e.target.value;
    }
    else if(e.target.name === "ride_time_location"){
        this.state.ride_time_location = e.target.value;
    }
    else if (e.target.name === "ride_time"){
        this.state.ride_time = e.target.value;
    }
    else if(e.target.name === "one_way"){
        this.state.one_way = e.target.value;
    }
    
    this.setState({
      user_id: localStorage.userID,
      driver_name: localStorage.name,
      driver_number: localStorage.phone,
      ride_city: this.state.ride_city,
      pickup_location: this.state.pickup_location,
      ski_destination: this.state.ski_destination,
      room_available: this.state.room_available,
      price_per: this.state.price_per,
      vehicletype: this.state.vehicletype,
      ride_time_location: this.state.ride_time_location,
      ride_time: this.state.ride_time,
      one_way: this.state.one_way,
      spots_left: this.state.spots_left
    });
  }

  render() {
    return (
      <div id="ride">
        <h1 className="text-center page-head">Create a New SkiLift Ride!</h1>
        <form onSubmit={this.newRideSubmit}>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="City/Town" 
              name="ride_city" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Pickup Location (Address)" 
              name="pickup_location" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Ski Destination" 
              name="ski_destination" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Room for Riders (& Gear)" 
              name="room_available" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Price per Person (Rider)" 
              name="price_per" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Vehicle Type" 
              name="vehicletype" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="Date" 
              placeholder="Date ofRide" 
              name="ride_time_location" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="Time" 
              placeholder="Time of Pickup" 
              name="ride_time" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control radio"
              type="radio" 
              placeholder="Two-Way Trip" 
              name="one_way"
              value={1} /> One Way
            <br></br>
            <input
              onChange={this.rideTxtFieldChange}
              className="form-control radio"
              type="radio"
              placeholder="One-Way Trip"
              name="one_way" 
              value={0} /> Two Way
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    )}
}

class PrivateRides extends Component {
  constructor(){
    super();

    this.state = {rides: null}
  }

  componentDidMount(){
    axios
      .get('/api/private/rides', {headers:{'rider1':localStorage.userID, 'rider2':localStorage.userID, 'rider3':localStorage.userID, 'rider4':localStorage.userID, 'rider5':localStorage.userID, 'rider6':localStorage.userID}})
      .then((res) => {
          this.setState({
            rides: res.data
          })
          console.log(res.data)
      }).catch((err) => {
          console.log(err)
      })
  }

  render(){
    const user_rides = [];
    if (this.state.rides !== null){
      for (let i = 0; i < this.state.rides.length; i++){
        user_rides.push(
          <ul className="thumbnail" key={i}>
                  <li><b> Your Driver: </b><ul><li> {this.state.rides[i].driver_name}</li>
                      <ul><li><span className="glyphicon glyphicon-earphone"></span>: {this.state.rides[i].driver_number}</li></ul></ul></li>
                      <hr></hr>
                  <li><b> Pickup Address:</b> {this.state.rides[i].pickup_location}    </li>
                  <li><b> Ski Destination:</b> {this.state.rides[i].ski_destination}    </li>
                  <li><b> Price:</b> ${this.state.rides[i].price_per} Per Person</li>
                  <li><b> Vehicle:</b> {this.state.rides[i].vehicletype}        </li>
                  <li><b> Pickup Date/Time:</b> {this.state.rides[i].ride_time_location} at {this.state.rides[i].ride_time} </li>
                  <li><b> Details:</b> {this.state.rides[i].one_way === true ? 'One-Way Trip (Ride Back Not Included/Available)' : 'Two-Way Trip'}</li>
                  <li><b> Room Available:</b> {this.state.rides[i].spots_left} Spots Left</li>    
          </ul>
        )
      }
    }

    return(
      <div>
        <h1>Your Upcoming Rides</h1>
          {user_rides}
      </div>
    )
  }
}

class PrivateDrives extends Component {
  constructor(){
    super();

    this.state = {drives: null}
  }

  componentDidMount(){
      axios
        .get('/api/private/drives', {headers:{'user_id':localStorage.userID}})
        .then((res) => {
            this.setState({
              drives: res.data
            })
          console.log("GIVE ME THE RIDES");
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
    }

  render(){
    const users_drives = [];
    if (this.state.drives !== null) {
      for (let i = 0; i < this.state.drives.length; i++){
        users_drives.push(
          <ul className="thumbnail" key={i}>
                  <li><b> Pickup Address: </b>{this.state.drives[i].pickup_location}    </li>
                  <li><b> Ski Destination: </b>{this.state.drives[i].ski_destination}    </li>
                  <li><b> Price:</b> ${this.state.drives[i].price_per} Per Person</li>
                  <li><b> Vehicle:</b> {this.state.drives[i].vehicletype}        </li>
                  <li><b> Pickup Date/Time:</b> {this.state.drives[i].ride_time_location} at {this.state.drives[i].ride_time} </li>
                  <li><b> Details:</b> {this.state.drives[i].one_way === true ? 'One-Way Trip (Ride Back Not Included/Available)' : 'Two-Way Trip'}</li>
                  <li><b> Room Available:</b> {this.state.drives[i].spots_left} Spots Left</li>
                  <li className={this.state.drives[i].rider1_name === null ? "hidden" : "show"}><b> Your Passengers: </b></li>
                  <ul> 
                    <li className={this.state.drives[i].rider1_name === null ? "hidden" : "show"}><b>#1: </b>{this.state.drives[i].rider1_name} </li>
                      <ul><li className={this.state.drives[i].rider1_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider1_phone} </li></ul>
                    <li className={this.state.drives[i].rider2_name === null ? "hidden" : "show"}><b>#2: </b> {this.state.drives[i].rider2_name} </li>
                      <ul><li className={this.state.drives[i].rider2_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider2_phone} </li></ul>
                    <li className={this.state.drives[i].rider3_name === null ? "hidden" : "show"}><b>#3: </b> {this.state.drives[i].rider3_name} </li>
                      <ul><li className={this.state.drives[i].rider3_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider3_phone} </li></ul>
                    <li className={this.state.drives[i].rider4_name === null ? "hidden" : "show"}><b>#4: </b> {this.state.drives[i].rider4_name} </li>
                      <ul><li className={this.state.drives[i].rider4_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider4_phone} </li></ul>
                    <li className={this.state.drives[i].rider5_name === null ? "hidden" : "show"}><b>#5: </b> {this.state.drives[i].rider5_name} </li>
                      <ul><li className={this.state.drives[i].rider5_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider5_phone} </li></ul>
                    <li className={this.state.drives[i].rider6_name === null ? "hidden" : "show"}><b>#6: </b> {this.state.drives[i].rider6_name} </li>
                      <ul><li className={this.state.drives[i].rider6_name === null ? "hidden" : "show"}><span className="glyphicon glyphicon-earphone"></span>: {this.state.drives[i].rider6_phone} </li></ul>
                  </ul>
          </ul>
        )
      }
    }
    return(
      <div>
        <h1> Upcoming Drives </h1>
          {users_drives}
      </div>
    )
  }
}

class PrivatePage extends Component {
  constructor(){
    super();
    this.state = {data:null,loading:true, auth:false}
  }
 componentDidMount(){
    const self = this;
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){ 
        axios
          .get('/api/private',{headers:{'authorization':localStorage.authToken}})
          .then((res) => {
            if(res.status === 200){
                self.setState({
                    loading:false,
                    auth:true,
                    data:res.data
                });
            }
        }).catch((err) => {
            window.location.href = '/';
        })
    }
    else {
        window.location.href = '/';
    }
  }

  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      localStorage.userLocation = this.state.data.location
      localStorage.userID = this.state.data.id;
      localStorage.name = this.state.data.firstname + ' ' + this.state.data.lastname;
      localStorage.phone = this.state.data.phonenumber;
      return (
        <div>
          <h1 className="text-center page-head">{"Welcome to your SkiLift profile " + this.state.data.firstname + "!"}</h1>
          <div className="row spacing"></div>
          <div className="row text-center">
            <div className="col-xs-1 col-md-2"></div>
            <div className="col-xs-5 col-md-4">
              <a href="/private/drives" className="thumbnail">Your Rides (Driver)
                <img className="drives-img" src="./images/skidrive.jpg" />
              </a>
            </div>
            <div className="col-xs-5 col-md-4">
              <a href="/private/rides" className="thumbnail">Your Rides (Rider)
                <img className="rides-img" src="./images/skiride.jpg" />
              </a>
            </div>
            <div className="col-xs-1 col-md-2"></div>
          </div>
          
        </div>
        //   <div className="col-xs-12 drives-button">
        //     <a href="/private/rides">Your Rides (Rider)
        //       <img className="drives-img" src="./images/skiride.jpg" />
        //     </a>
        //   </div>
        // </div>
        );
    }
  }
}

class Register extends Component {
  constructor(){
    super();
    this.state = {username:null,email:null,password:null,firstname:null,lastname:null,location:null,phonenumber:null,usertype:false,vehicletype:null,licensenumber:null,drivershow:false};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  showDriverSignup(){
    if (this.state.drivershow === false){
        this.setState({
          drivershow: true
    })
    console.log(this.state.drivershow)
    } else {
        this.setState({
          drivershow:false
        })
    console.log(this.state.drivershow)
    }
  }

  formSubmit(e){
    e.preventDefault();
    axios
      .post('/api/encrypt',this.state)
      .then( (res) =>{
        console.log(res);
      })
      window.location.href = '/login'
  }

  txtFieldChange(e){
    if(e.target.name === "username"){
        this.state.username = e.target.value;
    }
    else if(e.target.name === "password"){
        this.state.password = e.target.value;
    }
    else if(e.target.name === "email"){
        this.state.email = e.target.value;
    }
    else if(e.target.name === "firstname"){
        this.state.firstname = e.target.value;
    }
    else if(e.target.name === "lastname"){
        this.state.lastname = e.target.value;
    }
    else if(e.target.name === "location"){
        this.state.location = e.target.value;
    }
    else if(e.target.name === "phonenumber"){
        this.state.phonenumber = e.target.value;
    }
    else if(e.target.name === "usertype"){
        this.state.usertype = e.target.value;
    }
    else if (e.target.name === "vehicletype"){
        this.state.vehicletype = e.target.value;
    }
    else if (e.target.name === "licensenumber"){
        this.state.licensenumber = e.target.value;
    }
    this.setState({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      location: this.state.location,
      phonenumber: this.state.phonenumber,
      usertype: this.state.usertype,
      vehicletype: this.state.vehicletype,
      licensenumber: this.state.licensenumber
    });
  }

  render() {
    return (
      <div id="auth">
        <h1>Registration Form</h1>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="E-mail" 
              name="email" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="First Name" 
              name="firstname" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Last Name" 
              name="lastname" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Location" 
              name="location" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Phone Number" 
              name="phonenumber" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange, ()=>{this.showDriverSignup()}}
              className="form-control"
              type="checkbox" 
              placeholder="Type of User (Rider or Driver)" 
              name="usertype" />
              Register as Driver
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className={this.state.drivershow === true ? "driverSignupShow" : "driverSignupHide"}
              type="text" 
              placeholder="Vehicle Type" 
              name="vehicletype" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className={this.state.drivershow === true ? "driverSignupShow" : "driverSignupHide"}
              type="text" 
              placeholder="Driver's License Number" 
              name="licensenumber" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

class App extends Component {
    constructor(){
      super();
    this.logout = this.logout.bind(this);

    this.find_user_location = this.find_user_location.bind(this);
  }

  find_user_location() {
    localStorage.search_location = localStorage.userLocation;
    window.location.href = '/home';
  }

  logout() {
    localStorage.clear()
    window.location.href = '/';
  }

   render() {
     console.log(localStorage.length)
        return (
          <div>
            <nav className="navbar navbar-right">
              <div className="container-fluid">
                <div className="navbar-header">
                 <button className={localStorage.length <= 1 ? "btn btn-primary hidden-nav" : "btn btn-primary show-nav"} onClick={()=>{this.logout()}}>Log Out</button>
                    <a className={localStorage.length <= 1 ? "btn btn-primary show-nav" : "btn btn-primary hidden-nav"}><Link to="/login" className={localStorage.length <= 1 ? "white show-nav" : "hidden-nav"}>Log In</Link></a>
                    <a className={localStorage.length === 0 ? "hidden-nav" : "show-nav"}><Link to="/private" className={localStorage.length <= 1 ? "hidden-nav" : "show-nav"}>My Profile</Link></a>
                    <a className={localStorage.length <= 1 ? "hidden-nav" : "show-nav"}><Link to="/newride" className={localStorage.length <= 1 ? "hidden-nav" : "show-nav"}>Create a Ride</Link></a>
                    <a className={localStorage.length === 0 ? "show-nav" : "hidden-nav"}><Link to="/register" className={localStorage.length === 0 ? "btn btn-primary show-nav" : "hidden-nav"}>Register</Link></a>
                    <a className={localStorage.length > 2 ? "show-nav" : "hidden-nav"}><Link to="/home" onClick={() => {this.find_user_location()}} className={localStorage.length > 2 ? "show-nav" : "hidden-nav"}>Rides Near You</Link></a>
                    <a className="navbar-brand"><Link to="/">
                      <img className="brand-image" alt="Brand" src="../images/skiliftlogo.png" />
                    </Link></a>
                </div>
               </div>
            </nav>
            <div className="content">
                {this.props.children}               
            </div>
          </div>
        )
    }
}

export {App,Home,NewRide,Register,RidePage,Login,NewHome,PrivateDrives,PrivatePage,PrivateRides};