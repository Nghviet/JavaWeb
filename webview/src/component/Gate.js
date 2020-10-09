import React, { useState } from 'react';

import '../css/gate.css';
import axios from '../axios';

export default function Gate(props) {

    const [processing,setProcessing] = useState(0);

    const onSignupClicked = (evt) => {
        evt.preventDefault();
        document.getElementById('signup').style.display = 'block';
    }

    const onSignupClose = (evt) => {
        evt.preventDefault();
        document.getElementById('signup').style.display = 'none';
    }

    const loginSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt.target.email.value);
        console.log(evt.target.password.value);

        localStorage.setItem('Auth',window.btoa(evt.target.email.value +":"+ evt.target.password.value));
        axios.get('/api/login')
        .then(result => props.loggedIn())
        .catch(err => console.warn(err));
    }

    return (
        <div className="w3-container container">
            <div className = "intro"> 
                <h2> Nhóm 12 - Mạng xã hội </h2>
                <p>
                    1 mạng xã hội thu nhỏ được 1 nhóm học sinh 
                </p>
            </div>

            <div className = "form_display">

                <form onSubmit = {loginSubmit} id = "login_form"> 
                    <input className = "login_input" type = "email" name = "email" placeholder = "Enter email"></input>
                    <br></br>
                    <input className = "login_input" type = "password" name = "password" placeholder = "Enter password"></input>
                    <button className="w3-button w3-block w3-green w3-section w3-padding" type="submit" id = "login_button">Sign In</button> 
                </form>

                <button onClick={onSignupClicked} className="w3-button w3-green w3-large" id = "signup_button">Sign Up</button>
                <div id="signup" className="w3-modal">
                    <div className="w3-modal-content w3-card-4 w3-animate-zoom" id = "signup_display">
                        <div className="w3-center">
                            <br/>
                            <span onClick={onSignupClose} className="w3-button w3-xlarge w3-transparent w3-display-topright" title="Close Modal">×</span>
                        </div>
                        <form className="w3-form" id = "signup_form_submit">
                            <div className="w3-section">
                                <label><b>Full name</b></label>
                                <input className="w3-input w3-border w3-margin-bottom signup_input" type="text" placeholder="Enter Full name" name="fullname" required/>
                                <label><b>Email</b></label>
                                <input className="w3-input w3-border w3-margin-bottom signup_input" type="email" placeholder="Enter Email" name="email" required/>
                                <label><b>Password</b></label>
                                <input className="w3-input w3-border signup_input" type="text" placeholder="Enter Password" name="password" required/>
                                
                            </div>
                            <div className = "w3-section">
                                <button className="w3-button w3-block w3-green w3-section w3-padding" id = "signup_button" type="submit">Sign Up</button>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}