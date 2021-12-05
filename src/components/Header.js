import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/farmer/login" className="item">
                Login
            </Link>
            <Link to="/farmer/signup" className="item">
                Sign Up
            </Link>
            <Link to="/farmer/dashboard" className="item">
                Dashboard
            </Link> 
            <div className="right menu">
                <Link to="/customer/login">Login Customer</Link>
                <Link to="/customer/signup">Signup Customer</Link>
            </div>
        </div>
    )
}

export default Header;