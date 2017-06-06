import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';



class Home extends Component {
  constructor(){
    super();
      this.state = {ride:null};

      this.reserveRide = this.reserveRide.bind(this);
  }

  componentDidMount(){
    let self = this;
    axios.get('http://localhost:3005/', {headers:{'location':localStorage.userLocation}})
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

  reserveRide(ride, user_ID) {
      
      const putURL1 = 'http://localhost:3005/rides1/' + ride.id;
      const putURL2 = 'http://localhost:3005/rides2/' + ride.id;
      const putURL3 = 'http://localhost:3005/rides3/' + ride.id;
      const putURL4 = 'http://localhost:3005/rides4/' + ride.id;
      const putURL5 = 'http://localhost:3005/rides5/' + ride.id;
      const putURL6 = 'http://localhost:3005/rides6/' + ride.id;

      let reserveRideData1 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        rider1: user_ID,
        // rider2: user_ID,
        // rider3: user_ID,
        // rider4: user_ID,
        // rider5: user_ID,
        // rider6: user_ID
        spots_left: ride.spots_left
      }

      let reserveRideData2 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        // rider1: user_ID
        rider2: user_ID,
        // rider3: user_ID,
        // rider4: user_ID,
        // rider5: user_ID,
        // rider6: user_ID
        spots_left: ride.spots_left
      }

      let reserveRideData3 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        // rider1: user_ID
        // rider2: user_ID,
        rider3: user_ID,
        // rider4: user_ID,
        // rider5: user_ID,
        // rider6: user_ID
        spots_left: ride.spots_left
      }

      let reserveRideData4 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        // rider1: user_ID
        // rider2: user_ID,
        // rider3: user_ID,
        rider4: user_ID,
        // rider5: user_ID,
        // rider6: user_ID
        spots_left: ride.spots_left
      }

      let reserveRideData5 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        // rider1: user_ID
        // rider2: user_ID,
        // rider3: user_ID,
        // rider4: user_ID,
        rider5: user_ID,
        // rider6: user_ID
        spots_left: ride.spots_left
      }

      let reserveRideData6 = {
        id: ride.id,
        ride_city: ride.ride_city,
        user_id: ride.user_id,
        pickup_location: ride.pickup_location,
        ski_destination: ride.ski_destination,
        room_available: ride.room_available,
        price_per: ride.price_per,
        ride_time_location: ride.ride_time_location,
        one_way: ride.one_way,
        vehicletype: ride.vehicletype,
        // rider1: user_ID
        // rider2: user_ID,
        // rider3: user_ID,
        // rider4: user_ID,
        // rider5: user_ID,
        rider6: user_ID,
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
      ride.push(<ul key={i}>
                  <li> {this.state.ride[i].pickup_location}    </li>
                  <li> {this.state.ride[i].ski_destination}    </li>
                  <li> {this.state.ride[i].room_available}     </li>
                  <li> {this.state.ride[i].price_per}          </li>
                  <li> {this.state.ride[i].vehicletype}        </li>
                  <li> {this.state.ride[i].ride_time_location} </li>
                  <li> {this.state.ride[i].one_way === true ? 'One-Way Trip (Ride Back Not Included/Available)' : 'Two-Way Trip'}</li>
                  <li> {this.state.ride[i].spots_left}         </li>
                  <button onClick={()=>{this.reserveRide(this.state.ride[i], localStorage.userID)}}>Reserve a spot now!</button>
                </ul>
                

      )}
    }
    return(
      <div>
          <h1> Upcoming SkUber Rides in {localStorage.userLocation}</h1>
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
      .post('http://localhost:3005/login', this.state)
      .then((res) => {
        console.log(res);
        localStorage.authToken = res.data.token;
        window.location.href = "http://localhost:3000/private";
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
        <h3>Login Form</h3>
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

class NewRide extends Component {
  constructor(){
    super();
    this.state = {user_id:null,ride_city:null,one_way:false,pickup_location:null,ski_destination:null,room_available:null,price_per:null,vehicletype:null,ride_time_location:null,rider1:null,rider2:null,rider3:null,rider4:null,rider5:null,rider6:null,spots_taken:null};
  
    this.newRideSubmit = this.newRideSubmit.bind(this);
    this.rideTxtFieldChange = this.rideTxtFieldChange.bind(this);
  }

  newRideSubmit(e){
    e.preventDefault();
    axios
      .post('http://localhost:3005/newride',this.state)
      .then( (res) =>{
        console.log(res);
      })
      window.location.href = 'http://localhost:3000'
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
    else if(e.target.name === "one_way"){
        this.state.one_way = e.target.value;
    }
    
    this.setState({
      user_id: localStorage.userID,
      ride_city: this.state.ride_city,
      pickup_location: this.state.pickup_location,
      ski_destination: this.state.ski_destination,
      room_available: this.state.room_available,
      price_per: this.state.price_per,
      vehicletype: this.state.vehicletype,
      ride_time_location: this.state.ride_time_location,
      one_way: this.state.one_way,
      spots_left: this.state.spots_left
    });
  }

  render() {
    return (
      <div id="ride">
        <h3>Create a New SkUber Ride in {localStorage.userLocation}!</h3>
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
              type="datetime-local" 
              placeholder="Date and Time of Ride" 
              name="ride_time_location" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.rideTxtFieldChange}
              className="form-control"
              type="checkbox" 
              placeholder="Two-Way Trip" 
              name="one_way" />One-Way
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    )}
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
          .get('http://localhost:3005/private',{headers:{'authorization':localStorage.authToken}})
          .then((res) => {
            console.log(res.data);
            if(res.status === 200){
                self.setState({
                    loading:false,
                    auth:true,
                    data:res.data
                });
            }
        }).catch((err) => {
            window.location.href = 'http://localhost:3000';
        })
    } else {
        window.location.href = 'http://localhost:3000';
    }
  }
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      localStorage.userLocation = this.state.data.location
      localStorage.userID = this.state.data.id
      localStorage.name = this.state.data.firstname + ' ' + this.state.data.lastname
      return (
        <div>
          <h1>Profile</h1>
          <h2>{"Hello " + this.state.data.username + ' ' + this.state.data.location + ' (' + this.state.data.firstname + ' ' + this.state.data.lastname + ') ' + " welcome to SkUber!"}</h2>
        </div>
        );
    }
  }
}
class Register extends Component {
  constructor(){
    super();
    this.state = {username:null,email:null,password:null,firstname:null,lastname:null,location:null,usertype:false,vehicletype:null,licensenumber:null,drivershow:false};

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
      .post('http://localhost:3005/encrypt',this.state)
      .then( (res) =>{
        console.log(res);
      })
      window.location.href = 'http://localhost:3000'
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
      usertype: this.state.usertype,
      vehicletype: this.state.vehicletype,
      licensenumber: this.state.licensenumber
    });
  }

  render() {
    return (
      <div id="auth">
        <h3>Registration Form</h3>
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

  }

  logout() {
    localStorage.clear()
    window.location.href = '/';
  }

   render() {
     console.log(localStorage.length)
        return (
            <div>
                <ul className="nav-bar">
                    <button className={localStorage.length === 0 ? "hidden-nav" : "show-nav"} onClick={()=>{this.logout()}}>Logout</button>
                    <li className={localStorage.length === 0 ? "hidden-nav" : "show-nav"}><Link to="/private" className={localStorage.length === 0 ? "hidden-nav" : "show-nav"}>{localStorage.name}</Link></li>
                    <li className={localStorage.length === 0 ? "hidden-nav" : "show-nav"}><Link to="/newride" className={localStorage.length === 0 ? "hidden-nav" : "show-nav"}>Create a Ride</Link></li>
                    <li className={localStorage.length === 0 ? "show-nav" : "hidden-nav"}><Link to="/login" className={localStorage.length === 0 ? "show-nav" : "hidden-nav"}>Login</Link></li>
                    <li className={localStorage.length === 0 ? "show-nav" : "hidden-nav"}><Link to="/register" className={localStorage.length === 0 ? "show-nav" : "hidden-nav"}>Register</Link></li>
                    <li className="show-nav"><Link to='/'>Homepage</Link></li>
                </ul>
                {this.props.children}               
            </div>
        )
    }
}

export {App,Home,NewRide,Register,Login,PrivatePage};