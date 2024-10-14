import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singup } from "../../session";
import { Redirect } from "react-router-dom";
import './SingupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (session) return (<Redirect to='/' />);

    const handelSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);

            return dispatch(singup(username, email, password)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field.'])

    }
    return (
        <div className="Signup-from-container">
            <h1 className="signup-form-headding">Welcome to Signup Page!</h1>
            <form className="signup-form" onSubmit={handelSubmit}>
                <ul className="signup-form-error-list">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className="signup-form-lable">Username:</label>
                <input
                    className="signup-form-input"
                    type="text"
                    required
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label className="signup-form-lable">Email:</label>
                <input
                    className="signup-form-input"
                    type="text"
                    required
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label className="signup-form-lable">Password:</label>
                <input
                    className="signup-form-input"
                    type="text"
                    required
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label className="signup-form-lable">Confirm password:</label>
                <input
                    className="signup-form-input"
                    type="text"
                    required
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <button className="signup-form-submit-button" type="submit">Sing up</button>
            </form>
        </div>
    )
}



export default SignupFormPage;
