/* eslint-disable */

import React,{useState} from 'react'
import axios from '../axios'
import {
	Card
} from 'react-bootstrap'

import '../css/post.css'

import Comment from './Comment'

export default function Post(props) {
	const post = props.post;
	console.log(post);
	const user = post.user;	

	const [onComment,setOnComment] = React.useState(false);

	const link = "/user/" + user.id;
	var likeClassname = "post_like";
	if(post.reacted) likeClassname += " post_like_true";

	const id = "post_id_" + post.id;
	const onLike = (evt) => {
		evt.persist();
		if(post.reacted == false)
			axios.post("/api/like/" + post.id)
			.then(result => {
				post.reacted = true;
				evt.target.classList.add("post_like_true");
			})
			.catch(err => console.log(err))
		else 
			axios.post("/api/unlike/" + post.id)
			.then(result => {
				post.reacted = false;
				evt.target.classList.remove("post_like_true");
			})
			.catch(err => console.log(err))
	}
	const openComment = (evt) => {
		console.log("Called");
		setOnComment(true);
	}

	return (
		<div className = "post_display" id = {id}>
			<div className = "post_header">
				<a href = {link}><span className = "post_span">{user.name}</span></a> 
				{post.group == null 
				?null 
				: 	<><span className = "post_span">  &#9654; </span>
					<a><span className = "post_span">{post.group}</span></a>
				</>}
			</div>
			<div className = "post_content">
				{post.data}
			</div>
			<div className = "post_action">
				<div className = {likeClassname} onClick = {onLike}>
					<span>
						Like
					</span>
				</div>
				<div className = "post_comment" onClick = {openComment}>
					<span>
						Comment
					</span>
				</div>
			</div>
			{onComment == false 
				?null 
				: 	<><Comment postid = {post.id}></Comment></>}
		</div>
	)
}