import { FaBell } from 'react-icons/fa';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// import sass file
import './navbar.scss';

// import images
// import admin from '../../Images/admin_pic.jpg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="space">
                </div>

                <div className="item_lists">
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                    <div className="item">
                        <FaBell className="item_icon" />
                        <span className="badge">0</span>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
