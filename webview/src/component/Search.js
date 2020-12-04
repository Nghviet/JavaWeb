/* eslint-disable */

import React, {useState, useEffect} from 'react'

import '../css/search.css'

import axios from '../axios';
import SearchTab from './SearchTab'
export default function Search(props) {
	console.log(props.match.params.querry)

	var querry = props.match.params.querry;
	var [friend,setFriend] = React.useState(null);
	var [nonfriend,setNonfriend] = React.useState(null);
	useEffect(() => {
			axios.get("/api/search/friend/" + querry,{"querry" : querry})
			.then( result => {
				console.log(result.data)
				setFriend(result.data)
			})
			.catch(err => console.log(err));
		}
	,[])

	useEffect(() => {
			axios.get("/api/search/nonfriend/" + querry,{"querry" : querry})
			.then( result => {
				setNonfriend(result.data)
				console.log(result.data)
			})
			.catch(err => console.log(err));
		}
	,[])
	if(friend == null || nonfriend == null) return null;

	return (
		<div className = "search_display">
			<div className = "search_left"></div>
			<div className = "search_main">
				<div>
					<h2> Friend </h2>
					{friend.map(friend => <SearchTab key = {friend.id} user = {friend} type = {1}></SearchTab>)}
				</div>
				<br></br>
				<div>
					<h2> Everyone </h2>
					{nonfriend.map(friend => <SearchTab key = {friend.id} user = {friend} type = {2}></SearchTab>)}
				</div>
				
			</div>
		</div>
	);
}