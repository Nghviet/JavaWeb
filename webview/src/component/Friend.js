/* eslint-disable */

import React,{ useState, useEffect } from 'react'

import axios from '../axios'

import '../css/friend.css'

import FriendTag from './FriendTag'
import User from './User'
export default function Friend(props) {
	
	var [friendReqs, setFriendReqs] = React.useState(null);
	var [display, setDisplay] = React.useState(null);
	var [friend, setFriend] = React.useState(null);
	var temp = null;
	
	useEffect(() => {
		axios.get("/api/getFriendReqs")
		.then(result => {
			if(result.data == "") {
				setFriendReqs([]);
			}
			else setFriendReqs(result.data);
		})
		.catch(err => {
			setFriendReqs([]);
		})

		axios.get("/api/getFriends")
		.then(result => {
			console.log(result);
			if(result.data == "") {
				setFriend([]);
			}
			else setFriend(result.data);
		})
		.catch(err => {
			setFriend([]);
		})

	},[])

	if(friendReqs == null || friend == null) return null;
	var userKey = "user_id_" + display;
	var user = (display == null)? null:(<User key = {userKey} id = {display}></User>)

	return (
		<div className = "friend_container">
			<div className = "friend_left">
				<h3> Friend list</h3>
				{friend.map(friend => 
					<FriendTag key = {friend.id} type = '2' user = {friend} setDisplay = {setDisplay}></FriendTag>
				)

				}

				<h3> Friend request </h3>
				{friendReqs.map(friend => 
					<FriendTag key = {friend.id}  type = '1' user = {friend} setDisplay = {setDisplay} ></FriendTag>
				)}
			</div>
			<div className = "friend_main">
				{user}
			</div>
		</div>
		);
}