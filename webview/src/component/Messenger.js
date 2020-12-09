/* eslint-disable */

import React, { useState, useEffect } from 'react';

import axios from '../axios';
import * as SockJS from 'sockjs-client';

import '../css/messenger.css'

import MessengerTab from './MessengerTab'
import MessageLine from './MessageLine'

export default function Messenger(props) {
	var [friendList, setFriendList] = React.useState([]);
	var [currentChat, setCurrentChat] = React.useState([])
	var [currentChatID, setChatID] = React.useState(-1);
	var [alert, setAlert] = React.useState(null);
	
	var Stomp = require('stompjs');
	var ws = new SockJS('http://localhost:8080/message');
	var client = Stomp.over(ws);
	client.debug = null
	client.connect({}, () => {
		client.subscribe('/message/' + localStorage.getItem('Username'),(message) => {
			console.log(message);
			if(message.headers.username == currentChatID) {
				currentChat.push({
					"sender": message.headers.username,
					"data" : message.body
				});
				setCurrentChat(currentChat);
			}
		})
	})
	

	
	useEffect(() =>{
		axios.get("/api/messageFriend")
		.then(result => {
			console.log(result);
			setFriendList(result.data[0]);
			setCurrentChat(result.data[1]);
			setChatID(result.data[0][0].id);
		})
		.catch(err => {
			console.log(err);
		})
	},[])
	

	var changeID = (newID) => {
		if(currentChatID != newID) {
			axios.get("/api/message/" + newID)
			.then(result => {
				setCurrentChat(result.data);
				setChatID(newID);
				console.log(currentChatID);
			})
			.catch(err => {

			})
		}
	}

	var onSend = (evt) => {
		evt.preventDefault();
		evt.persist();

		try {
			client.send('/message/' + currentChatID, {
				'username' : localStorage.getItem('Username')
			}, evt.target.chatinput.value);
			document.getElementById('chatinput').value = '';

		}
		catch(err) {
			setAlert(<div className = "alert alert-danger" role="alert"> Cannot send message</div>);
		}
	}

	return(
		<div id = "messenger">
			<div id = "messenger_friend">
				{friendList.map(friend => (
		                <MessengerTab key = {friend.id} user = {friend} changeID = {changeID}></MessengerTab>
		        ))}
			</div>
			<div id = "messenger_main">
	            <div className="history">
	                {currentChat.map(message => (
	                    <MessageLine key = {message.id} msg = {message}></MessageLine>
	                ))}
	            </div>
	            <div className="input">
	                <form onSubmit = {onSend}>
	                    <input type="text" className="chatinput" id = "chatinput" placeholder="Type a message"/>>
	                                
	                    <button className="send" type="submit">
	                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
	                    </button>
	                </form>
	           	</div>
	        </div>
		</div>
	);
}