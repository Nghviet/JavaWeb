import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import axios from './axios';

import Gate from './component/Gate'
import Homepage from './component/Homepage'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged : false
        }
        console.log(props);
    }

    logout = ()  => {
        this.setState({logged : false});
        localStorage.clear();
    }

    login = () => {
        this.setState({logged : true});
    }

    render() {
        if(localStorage.getItem('Auth') == null) {
            return(
                <Router>
                    <Redirect to="/"></Redirect>
                    <Gate loggedIn = {this.login} />
                </Router>
            )
        }
        else return (
                <Homepage logout = {this.logout}/>
            );
    }
}

export default App;
