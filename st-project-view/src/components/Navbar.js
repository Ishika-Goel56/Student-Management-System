import React from 'react'

const Navbar = () => {
    return(
         <div className="navbar">
            <h1 className="logo"> Student Management System</h1>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/">Profile</a>
                <a href="/">Logout</a>
            </div>
         </div>
    )
}

export default Navbar