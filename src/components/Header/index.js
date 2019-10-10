import React from 'react'
import { FaUser } from 'react-icons/fa';

import './styles.css'

function Header() {
  return (
    <header>
      <div className='container'>
        <div className='userData'>
          <label>Name</label>
          <div>
            <FaUser size={26} color={'#a9a9a9'} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header