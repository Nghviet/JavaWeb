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
			"posts" : [
				{
					"id" : 1,
					"owner" : {
						"email" : "a@a",
						"name" : "TEN NGUOI DUNG",
						"id": "-1"
					},
					"group" : "Some group",
					"data" : "1 bai post rat dai ve 1 cai gi do rat thu vi",

				}
			],
			"user" : {
				"id" : id,
				"email" : "a@a",
				"name" : "TEN NGUOI DUNG"
			}
		}

		axios.get("/API/userposts",{"id" : this.state.id})
		.then(result => {
			this.state.posts = result
		})
		.catch(err => {

		})

		axios.get("/API/user",{"id" : this.state.id})
		.then(result => {
			this.state.user = result
		})
		.catch(err => {

		})
	}

	render() {
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