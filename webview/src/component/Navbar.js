/* eslint-disable */

import React, { useState, useEffect } from 'react';

import {
	Redirect
} from 'react-router-dom';

import axios from '../axios';

import '../css/navbar.css'

import Home from '../img/navbar_home.png'
import Friend from '../img/navbar_friend.png'
import Group from '../img/navbar_group.svg'

export default function Navbar(props) {

	var path = window.location.pathname;

	var navbar_home_css = {};
	var navbar_friend_css = {};
	var navbar_group_css = {};
	var navbar_messenger_css

	var [userPath, setUserPath] = React.useState(null);

	if(path== "/") {
		navbar_home_css = {
			"borderBottom" : "5px solid red"
		}
	}

	if(path.startsWith("/friend") || path.startsWith("/profile")) {
		navbar_friend_css = {
			"borderBottom" : "5px solid red"
		}
	}

	if(path.startsWith("/group")) {
		navbar_group_css = {
			"borderBottom" : "5px solid red"
		}
	}

	const logout = (evt) => {
		props.logout();
	}

	const onNavbarSearch = (evt) => {
		evt.preventDefault();
		console.log(evt.target.query.value)
		window.location.pathname = "/search/q=" + evt.target.query.value.replace(" ","+");
	}

	const redirect = (evt) => {
		evt.preventDefault();
		window.location.pathname = "/user/" + userPath.id;
	}
	var userProfile = (userPath == null)? null:<button className = "w3-button logout_button" onClick = {redirect}>{userPath.name}</button> ;
	useEffect(() => {
		axios.get('/api/user')
		.then(result => {
			console.log(result);
			setUserPath(result.data[0]);
		})
		.catch(err => console.log(err));
	},[])


    return(
        <div className = "w3-top navbar">
			<div className = "left">
				<label className = "navbar_search_label">
					<form className = "navbar_search_form" onSubmit = {onNavbarSearch}>
						<input type = "text" name = "query" className = "navbar_search"></input>
					</form>
					
				</label>
			</div>
			<div className = "middle">
				<div className = "middle_button" id="navbar_home" style = {navbar_home_css}>
					<a className = "navbar_item" href = "/"><img src = {Home} className = "navbar_img"></img></a>
				</div>
				<div className = "middle_button" id="navbar_friend" style = {navbar_friend_css}>
					<a className = "navbar_item" href = "/friend"><img src = {Friend} className = "navbar_img"></img></a>
				</div>
				<div className = "middle_button" id="navbar_group" style = {navbar_group_css}>
					<a className = "navbar_item" href = "/group"><img src = {Group} className = "navbar_img"></img></a>
				</div>
			</div>
			<div className = "right">
				<div className = "right_flex">
					
				</div>
				<div className = "right_flex">
					<div className = "navbar_profile">{userProfile}</div>
					<div className = "navbar_logout"><button className = "w3-button logout_button" onClick = {logout}> Log out</button></div>
					
				</div>
			</div>
		</div>
    );
}