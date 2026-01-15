import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import Login from './Login';

import homeIcon from '../assets/home.png'
import userIcon from '../assets/user.png'
import scheduleIcon from '../assets/schedule.png'

import './NavBar.css';

const NavBar = ({ user, onLoginClick, onLogout, onLoginSuccess, onLoginFailure, handleCloseModal }) => {
    const handleClose = () => {
        handleCloseModal(); // Notify App to close modal
    };

    return (
        <div className='nav-container'>
            <div className="title-block">
                <img src={scheduleIcon} alt="Schedule Icon" className="logo" />
                <div class="loader">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <h1 className="title">UW Exam Scheduler</h1>
                {/* <div class="circle-divider"></div> */}
                <p className="tagline">Automated Exam Planner</p>
            </div>
            <div className="nav-items">
                <Link to="/">
                    <img src={homeIcon} alt="Home Icon" className="nav-icon" data-tooltip="Home"/>
                </Link>
                {user ? (
                    <div className="user-info">
                        <img src={user.imageUrl} alt={user.name} className="user-icon" />
                        <span>{user.name}</span>
                        <button onClick={onLogout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    <button onClick={onLoginClick} className="nav-icon-button">
                        <img src={userIcon} alt="Login Icon" className="nav-icon" data-tooltip="Login"/>
                    </button>
                )}
            </div>
            {/* {showLoginModal && (
            <Modal show={showLoginModal} onClose={handleClose}>
                <Login
                    onLoginSuccess={onLoginSuccess}
                    onLoginFailure={onLoginFailure}
                    handleCloseModal={handleClose}
                />
            </Modal>
            )} */}
        </div>

    );
};


export default NavBar;
