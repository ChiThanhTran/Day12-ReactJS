import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function LoginPage({ setButtonContent, isLogined, setIsLogined }) {
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [emailError, SetEmailError] = useState();
    const [passwordError, SetPasswordError] = useState();

    const navigate = useNavigate();
    function OnEmailChange(newEmail) {
        SetEmail(newEmail);
        if (newEmail === '' || newEmail === undefined) {
            SetEmailError('Required');
            return false;
        } else if (!String(newEmail).toLowerCase().match
            (/^[0-9a-zA-Z]+\@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/g)) {
            SetEmailError('Must be a valid email');
            return false;
        } else {
            SetEmailError('');
            return true;
        }
    }
    function OnPasswordChange(newPassword) {
        SetPassword(newPassword);
        if (newPassword === '' || newPassword === undefined) {
            SetPasswordError('Required');
            return false;
        } else if (newPassword.length < 8) {
            SetPasswordError('Must be a at least 8 character');
            return false;
        } else {
            SetPasswordError('');
            return true;
        }
    }
    const onSubmit = () => {
        if (OnEmailChange(email) && OnPasswordChange(password)) {
            fetch('https://60dff0ba6b689e001788c858.mockapi.io/tokens', { method: 'GET', })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    const { token, userId } = json;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                }).then(() => {
                    setButtonContent('Logout')
                    setIsLogined(true)
                })
        }

    }
    return (
        <div>
            <input value={email} onChange={(e) => OnEmailChange(e.target.value)} type="text" placeholder="Email" /><br />
            {emailError && (
                <div style={{ color: 'red' }}>{emailError}</div>
            )}
            <input value={password} onChange={(e) => OnPasswordChange(e.target.value)} type="password" placeholder="Password" /><br />
            {passwordError && (
                <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <Button onClick={onSubmit}>Submit</Button>
            <h3>{isLogined ? "Login successfully" : null}</h3>
        </div>
    )
}