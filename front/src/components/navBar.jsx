import React, { useState } from 'react';


function NavBar({ onLogout }) {

    const [menuOpen, setMessage] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        setMessage(!menuOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        onLogout();
    };

    return (
        <nav>
            <button className="nav-button" onClick={handleClick}>Menu</button>
            {menuOpen &&
                <ul className='nav-links'>
                    <li><a className="nav-link" href="/">Home</a></li>
                    <li><a className="nav-link" href="/about">About</a></li>
                    <li><a className="nav-link" href="/contact">Contact</a></li>
                </ul>
            }
            <button className="nav-button-logout" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default NavBar;
