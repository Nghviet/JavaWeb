import React, {Component} from 'react'

import Post from './Post'

import axios from '../axios'

export default class PostHandler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"posts" : [
			{
				"owner" : {
					"email" : "a@a",
					"name" : "TEN NGUOI DUNG",
					"id": "-1"
				},
				"group" : "",
				"data" : "1 bai post rat dai ve 1 cai gi do rat thu vi",
				
			}


			]
		}

		axios.get("http://localhost:8080/posts",{"from" : 0,"to": 10})
		.then( result => {
			console.log(result);
			this.state.posts = result
		})
		.catch(err => {
			console.log(err);
		}) 
	}

	render() {
		return(
			<div>
				{this.state.posts.map(post => (
		                <Post key = {post.id} post = {post}></Post>
		        ))}	 
	        </div>       
	    )
	}
}