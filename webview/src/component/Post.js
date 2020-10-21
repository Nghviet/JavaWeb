import React from 'react'

import {
	Card
} from 'react-bootstrap'

import '../css/post.css'

import Comment from './Comment'

export default function Post(props) {
	const post = props.post;
	const user = post.owner	

	const link = "/user/" + user.id;

	return (
		<div className = "post_display">
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
				<div className = "post_like">
					<span>
						Like
					</span>
				</div>
				<div className = "post_comment">
					<span>
						Comment
					</span>
				</div>
			</div>
			<Comment postid = {post.id}></Comment>
		</div>
	)
}