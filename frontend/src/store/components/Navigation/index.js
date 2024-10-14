import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <li className='navigation-list-item'>
                    <NavLink to='/login'>Log In</NavLink>
                </li>
                <li className='navigation-list-item'>
                    <NavLink to='signup'>Sign Up</NavLink>
                </li>

            </>
        );
    }
    return (
        <>
            <ul className='navigation-list'>
                <li className='navigation-list-item'>
                    <NavLink to='/'>Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </>
    );
};





export default Navigation;
