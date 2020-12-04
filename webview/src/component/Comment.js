/* eslint-disable */

import React, {Component} from 'react'

import axios from '../axios'

import CommentLine from './CommentLine'

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"postID" : props.postid,
			"comments" : [],
			"news" :[]
		}
		this.onComment = this.onComment.bind(this);
	}

	componentDidMount = () => {
		axios.get("/api/comment/" + this.state.postID)
		.then( result => {
			this.setState({"comments":result.data});
		})
		.catch(err => {throw err})
	}

	onComment = (evt) => {
		evt.preventDefault();
		console.log("Called");
		axios.post("/api/comment/"+this.state.postID,{
			"data" : evt.target.comment_text.value
		})
		.then(result => {
			document.getElementById("comment_text").value = "";
			var newcomments = this.state.news;
			result.data[0].id = newcomments.length;
			newcomments.unshift(result.data[0]);

			this.setState({"news":newcomments});
		})	
		.catch(err => {
			console.log(err)
		});
	}

	render() {
		var id = "comment_display_" + this.state.postID;
		return (
			<div id = {id}>
				<form onSubmit = {this.onComment} >
					<textarea id = "comment_text" rows = "1" cols = "60"></textarea>
					<button type="submit">Comment</button>
				</form>
				
				{this.state.news.map(comment => (
		            <CommentLine key = {comment.id} comment = {comment}></CommentLine>
		        ))}

				{this.state.comments.map(comment => (
		            <CommentLine key = {comment.id} comment = {comment}></CommentLine>
		        ))}	
			</div>
		);
	}
}