import { login } from "../../session";
import React ,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

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
            <h1>Welcom to Login page!</h1>
            <form onSubmit={handelSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>username or email</label>
                <input
                    type="text"
                    placeholder="name or email here"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                ></input>
                <label>password</label>
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <button type="submit">Login</button>
            </form>
        </>
    )
}






export default LoginFormPage;
