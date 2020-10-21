import React,{ useState, useEffect } from 'react'

import axios from '../axios'

import '../css/friend.css'

import FriendTag from './FriendTag'
import User from './User'
export default function Friend(props) {
	
	var [friends, setFriends] = React.useState([]);
	var [display, setDisplay] = React.useState(null);
	var [loading1, setLoading1] = React.useState(false);
	var [loading2, setLoading2] = React.useState(false);
	var temp = null;
	
	useEffect(() => {
		axios.get("/API/getFriendReqs")
		.then(result => {
			setFriends(result);
			setLoading1(true);
		})
		.catch(err => {
			setFriends([
				{
					"type" : 1,
					"user" : {
						"email" : "a@a",
						"name" : "TEN NGUOI DUNG",
						"id": "-1"
					}
				}
			]);
			setLoading1(true);
		})
	},[])

	if(loading1 == false ) return null;

	var user = (display == null)? null:(<User id = {display}></User>)

	return (
		<div className = "friend_container">
			<div className = "friend_left">
				{friends.map(friend => 
					<FriendTag type = '1' user = {friend.user} setDisplay = {setDisplay} ></FriendTag>
				)}
			</div>
			<div className = "friend_main">
				{user}
			</div>
		</div>
		);
}