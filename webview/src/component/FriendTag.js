/* eslint-disable */

import React, {useState} from 'react'

import axios from '../axios'

export default function FriendTag(props) {
	const type = props.type;

	const user = props.user;
	const [accepted,setAcc] = React.useState(false);

	const button = (accepted == false) ? ((type == 1)? "Accept": "Send request") : ((type == 1)? "Accepted": "Sent");

	const id = "friendtag_" + type + "_" +user.id;

	const onClickAcpt = (evt) => {
		evt.preventDefault();
		axios.post('/api/acceptFriendReq',{"from" : user.id})
		.then(result => {
			document.getElementById(id).style.display = 'none';
		})
		.catch(err => {
		})

	}

	const onClickRemv = (evt) => {
		evt.preventDefault();
		axios.post('/api/removeFriendReq',{"from" : user.id})
		.then(result => {
			document.getElementById(id).style.display = 'none';
		})
		.catch(err => {
		})
	}

	const onClickh2 = (evt) =>{ 
		evt.preventDefault();
		props.setDisplay(user.id);
	}

	var Actbutton = null;
	if(type == '1') 
		Actbutton = (
			<>
				<div className = "friendtag_button_1" onClick = {onClickAcpt} >
					<span> { button }</span>
				</div>
				<div className = "friendtag_button_1" onClick = {onClickRemv} >
					<span> Remove </span>
				</div>
			</>)

	return (
		<div className = "friendtag_container" id = {id}>
			<h2 onClick = {onClickh2} ><span className = "friendtag_h2">{user.name}</span></h2>
			<div className = "friendtag_button">
				{Actbutton}
			</div>
		</div>
	)
}