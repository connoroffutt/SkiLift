import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {App,Home,NewRide,Login,PrivatePage,Register} from './App';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/rides1/:id" component={Home} />
            <Route path="/rides2/:id" component={Home} />
            <Route path="/rides3/:id" component={Home} />
            <Route path="/rides4/:id" component={Home} />
            <Route path="/rides5/:id" component={Home} />
            <Route path="/rides6/:id" component={Home} />
            <Route path="newride" component={NewRide} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/private" component={PrivatePage} />
        </Route>
    </Router>,
  document.getElementById('root')
);