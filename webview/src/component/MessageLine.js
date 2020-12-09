/* eslint-disable */

import React, { useState, useEffect } from 'react';

import axios from '../axios';

export default function MessageLine(props) {
	if(props.msg.sender == localStorage.getItem('Username')) 
        return (
            <div class="outgoing">
                <p>{props.msg.data}</p>
            </div>
        )
    else return (
        <div class="incomming">
            <p>{props.msg.data}</p>  
        </div>
    )
}