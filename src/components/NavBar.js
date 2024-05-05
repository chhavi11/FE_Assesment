import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <ul>
            <li className='navbar-links'>
                <Link className='path-link' to='/'>Univesities</Link>   
            </li>
            <li className='navbar-links'>
            <Link className='path-link' to={`/detail/${0}`}>Detail</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar