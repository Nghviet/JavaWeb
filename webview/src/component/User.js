/* eslint-disable */

import React ,{Component}from 'react'

import '../css/user.css'
import axios from '../axios'
import Background from '../img/general_background.jpg'

import Post from './Post'

export default class User extends Component {
	constructor(props) {
		super(props);
		
		var id = null;
		if(props.match == undefined) id = props.id;
		else id = props.match.params.id

		this.state = {
			"id" : id,
			"posts" : [],
			"user" : null
		}

		
	}

	componentDidMount() {
		axios.get("/api/userpost/" + this.state.id)
		.then(result => {
			console.log(result);
			this.setState({ "posts" : result.data });
		})
		.catch(err => {

		})

		axios.get("/api/user/" + this.state.id)
		.then(result => {
			console.log(result);
			this.setState({ "user" : result.data });
		})
		.catch(err => {

		})
	}

	render() {
		if(this.state.user == null) return null;
		
		return(
			<div className = "user">
				<div className = "user_header">
					<img className = "background_img" src = {Background} ></img>
					<h2>{this.state.user.name}</h2>
				</div>
				<div className = "user_container">
					<div className = "user_left">
						
					</div>
					<div className = "user_center">
						{this.state.posts.map(post => (
				            <Post key = {post.id} post = {post}></Post>
				        ))}
					</div>
					
					<div className = "user_right">
						
					</div>
				</div>
				
			</div>
		);
	} 
}