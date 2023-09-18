import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
    <nav className="navbar bg-dark">
    <h1>
        <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
    </h1>
        <ul>
            <Link to='/Register'>Register</Link>
            <Link to='/Login'>Login</Link>
            <Link to='/Developers'>Developers</Link>
        </ul>
    </nav>
    )
}

export default Navbar
