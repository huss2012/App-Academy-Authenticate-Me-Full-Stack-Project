import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../session';
import './ProfileButton.css'



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }
    return (
        <>
            <button className='profile-pic-but' onClick={openMenu}>
                <i style={{ fontSize: "70px" }} className='fas fa-user-circle' />
            </button>
            {
                showMenu && (
                    <ul className='profile-user-info'>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button className='profile-logout-but' onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )
            }
        </>
    )
}


export default ProfileButton;
