/* eslint-disable */

import React from 'react';

import PostHandler from './PostHandler'
import axios from '../axios'

import '../css/newsfeed.css';

import FriendIMG from '../img/navbar_friend.png'
import GroupIMG from '../img/navbar_group.svg'

export default function Newsfeed(props) {

	const friend = () =>{
		document.location.href = "/friend"
	}
	const group = () => {
		document.location.href = "/group"
	}

	return(
		<div className = "newsfeed">
			<div className = "newsfeed_left">
				<div className = "newsfeed_menu_item" onClick = {friend}>
					<img src = {FriendIMG} className = "newsfeed_img"></img>
					<div className = "newsfeed_menu_item_des" > Friends </div>
				</div>
				<div className = "newsfeed_menu_item" onClick = {group}>
					<img src = {GroupIMG} className = "newsfeed_img"></img>
					<div className = "newsfeed_menu_item_des" > Groups </div>
				</div>
			</div>
			<div className = "newsfeed_center">
				<PostHandler></PostHandler>
			</div>
			<div className = "newsfeed_right">
				
			</div>
		</div>
	)
}