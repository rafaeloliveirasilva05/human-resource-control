import React from 'react'
import { FaUser } from 'react-icons/fa';

import styles from './styles.module.css'

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.userData} >
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