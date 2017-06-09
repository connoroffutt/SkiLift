import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {App,Home,NewRide,Login,NewHome,PrivateDrives,PrivatePage,PrivateRides,Register,RidePage} from './App';
import './index.css';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NewHome} />
            <Route path="/home" component={Home} />
            <Route path="/private/rides" component={PrivateRides} />
            <Route path="/private/drives" component={PrivateDrives} />
            <Route path='/rides/:id' component={RidePage} />
            <Route path="/newride" component={NewRide} />
            <Route path="/loginPage" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/private" component={PrivatePage} />
        </Route>
    </Router>,
  document.getElementById('root')
);