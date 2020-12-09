/* eslint-disable */

import React, { useState, useEffect } from 'react';

import axios from '../axios';

export default function MessengerTab(props) {
		
	var onClick = () => {
		props.changeID(props.user.id);
	}
	
	return(
		<div className = "messengertab" onClick = {onClick}>
			<span> {props.user.name} </span>
		</div>
	);
}