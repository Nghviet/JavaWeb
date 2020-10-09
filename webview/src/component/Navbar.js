import React, { useState } from 'react';

import axios from '../axios';

import '../css/navbar.css'

import Home from '../img/navbar_home.png'
import Friend from '../img/navbar_friend.png'
import Group from '../img/navbar_group.svg'

export default function Navbar(props) {


	console.log(window.location.pathname);

	var path = window.location.pathname;

	var navbar_home_css = {};
	var navbar_friend_css = {};
	var navbar_group_css = {};

	if(path== "/") {
		console.log(document.getElementById("navbar_friend"));
		navbar_home_css = {
			"borderBottom" : "5px solid red"
		}
	}

	if(path.startsWith("/friend") || path.startsWith("/profile")) {
		console.log(document.getElementById("navbar_friend"));
		navbar_friend_css = {
			"borderBottom" : "5px solid red"
		}
	}

	if(path.startsWith("/group")) {
		console.log(document.getElementById("navbar_friend"));
		navbar_group_css = {
			"borderBottom" : "5px solid red"
		}
	}

	const logout = (evt) => {
		props.logout();
	}


    return(
        <div className = "w3-top navbar">
			<div className = "left">
				
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
					<button className = "w3-button logout_button" onClick = {logout}> Log out</button>
				</div>
			</div>
		</div>
    );
}