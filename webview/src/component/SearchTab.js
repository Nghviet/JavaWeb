/* eslint-disable */

import React ,{useState} from 'react'

import axios from '../axios'

export default function SearchTab(props) {
	console.log(props.user);
	console.log(props.type);

	const [send, setSend] = React.useState(false);

	const link = "/user/" + props.user.id;

	const id = "searchtab_user_" + props.user.id;

	const onSendReq = (evt) => {
		evt.preventDefault();
		axios.post("/api/sendFriendReq",{"to" : props.user.id})
		.then(result =>{
			props.user.requested = true;
			setSend(!send);
		})
		.catch(err => {

		})
	}

	const cancelReq = (evt) => {
		evt.preventDefault();
		axios.post("/api/cancelFriendReq",{"to" : props.user.id})
		.then(result => {
			props.user.requested = false;
			setSend(!send);
		})
	}

	const onFriendAcpt = (evt) => {
		evt.preventDefault();
		axios.post("/api/acceptFriendReq",{"from" : props.user.id})
		.then(result => {
			console.log(document.getElementById(id));
			document.getElementById(id).style.display = 'none';

			console.log(result);
		})
		.catch(err => {

		})
	}

	var button = null;
	if(props.type == 2 && props.user.requested == false && props.user.received == false) {
		button = <button className="btn btn-light" onClick = {onSendReq}> Send request </button>
	}
	if(props.type == 2 && props.user.received == true) {
		button = <button  className="btn btn-primary" onClick = {onFriendAcpt}> Accept request </button>
	}
	if(props.type == 2 && props.user.requested == true) {
		button = <button  className="btn btn-primary" onClick = {cancelReq}> Sent </button>
	}


	return (
		<div id = {id} className = "searchtab">
			<div className = "searchtab_avatar">
				
			</div>
			<div className = "searchtab_display">
				<h4><a href = {link}><span>{props.user.name}</span> </a>  </h4>
			</div>
			<div className = "searchtab_action">
				{button}
			</div>
		</div>
	);
}