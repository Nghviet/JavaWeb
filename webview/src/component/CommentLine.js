/* eslint-disable */

import React, {Component} from 'react'

import axios from '../axios'

export default function CommentLine(props) {
	const user = props.comment.user;
	const data = props.comment.data;
	const link = "/user/" + user.id;
	return (
		<div>
			<div className = "post_header">
				<a href = {link}><span className = "post_span">{user.name}</span></a> 
			</div>
			<div className = "post_content">
				{data}
			</div>
		</div>
		)
}