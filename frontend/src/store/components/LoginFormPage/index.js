import { login } from "../../session";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (<Redirect to='/' />);
    const handelSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        return dispatch(login(credential, password))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

    };

    return (
        <>
            <div className="login-form-container">
                <h1 className="login-form-headding">Welcom to Login page!</h1>
                <form className="login-form" onSubmit={handelSubmit}>
                    <ul className="login-form-error-list">
                        {errors.map((error, idx) => <li className="login-form-error-list-item" key={idx}>{error}</li>)}
                    </ul>
                    <label className="login-form-lable">username or email:</label>
                    <input
                        type="text"
                        placeholder="name or email here"
                        value={credential}
                        className="login-form-input"
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    ></input>
                    <label className="login-form-lable">password:</label>
                    <input
                        type="text"
                        placeholder="password"
                        value={password}
                        className="login-form-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                    <button className="login-form-submit-button" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}






export default LoginFormPage;
