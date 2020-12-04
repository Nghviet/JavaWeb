/* eslint-disable */

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
import User from './User';
import Friend from './Friend';
import Search from './Search';

export default function Homepage(props) {
    return(
        <Router>
            <Navbar logout = {props.logout}/>
            <div className = "homepage_main">
                <Switch>
                    <Route exact path = "/"><Newsfeed></Newsfeed></Route>    
                    <Route path = "/user/:id" component = {User}></Route>    
                    <Route path = "/friend" component = {Friend}></Route>
                    <Route path = "/search/q=:querry" component = {Search}></Route>
                </Switch>
            </div>
        </Router>
        
    );
}