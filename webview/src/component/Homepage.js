import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,  
  Route
} from 'react-router-dom';

import axios from '../axios';

import '../css/homepage.css';

import Navbar from './Navbar';
import Newsfeed from './Newsfeed';

export default function Homepage(props) {
    return(
        <Router>
            <Navbar logout = {props.logout}/>
            <div className = "homepage_main">
                <Switch>
                    <Route exact path = "/"><Newsfeed></Newsfeed></Route>        
                </Switch>
            </div>
        </Router>
        
    );
}