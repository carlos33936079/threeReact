import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../../assets/data/NavBarData'

function NavBar() {
  return (
    <div className='navBarContainer'>
        <ul>
            {links.map((link) => {
        return <li className='navBarLink_li' key={link.id}><Link to={link.path} className='link_category'>{link.name}</Link></li>
      })}
        </ul>
    </div>
  )
}

export default NavBar