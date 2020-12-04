/* eslint-disable */

import React, {Component} from 'react'
import {
	Card,
	Button
} from 'react-bootstrap'


import Post from './Post'

import axios from '../axios'

export default class PostHandler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"posts" : [],
			"newPost" : []
		}

		
	}

	componentDidMount() {
		axios.get("http://localhost:8080/api/posts",{"from" : 0,"to": 10})
		.then( result => {
			console.log(result);
			this.setState({"posts" : result.data});
		})
		.catch(err => {
		}) 
	}

	onClickpost = (evt) => {
		evt.preventDefault();
		document.getElementById('post_form_div').style.display = 'block';
	}

	onClosepost = (evt) => {
		evt.preventDefault();
		document.getElementById('post_form_div').style.display = 'none';
	}

	onPostSubmit = (evt) => {
		evt.preventDefault();
		axios.post("/api/post",{
			"post" : evt.target.post_text.value
		})
		.then(result => {
			console.log(result);
			document.getElementById('post_form_div').value = '';
			document.getElementById('post_form_div').style.display = 'none';
		})
		.catch(err => {
			document.getElementById('post_form_div').value = '';
			document.getElementById('post_form_div').style.display = 'none';
		})
	}

	render() {
		return(
			<div>
				<div id = "post_section">
					<div id = "post_avatar">
						
					</div>
					<div id = "post_button" onClick = {this.onClickpost}>
						<span> Ban dang nghi gi, muon chia se khong</span>
					</div>

				</div>
				<div id="post_form_div" className="w3-modal">
                    <div className="w3-modal-content w3-card-4 w3-animate-zoom" id = "signup_display">
                        <div className="w3-center">
                            <br/>
                            <b>Tao bai viet moi</b>
                            <span onClick = {this.onClosepost} className="w3-button w3-xlarge w3-transparent w3-display-topright">×</span><br></br>
                        </div>
                        <form className="w3-form" id = "post_form" onSubmit = {this.onPostSubmit}>
                            <div className="w3-section">
                                <textarea type = "textbox" id = "post_text" placeholder = "Ban dang nghi gi, muon chia se ko"></textarea>
                            </div>
                            <div className = "w3-section">
                                <button className="w3-button w3-block w3-green w3-section w3-padding" id = "post_submit" type="submit">Post</button>  
                            </div>
                        </form>
                    </div>
                </div>
				{this.state.posts.map(post => (
		                <Post key = {post.id} post = {post}></Post>
		        ))}	 
	        </div>       
	    )
	}
}