

import React from 'react'
import { FaUsersCog, FaCode, FaShoppingCart} from 'react-icons/fa'

import styles from './styles.module.css'

const Card = (props) => {
  const { color, departament, TotalEmployeesDepartment } = props

  const chooseIcon = (departament) =>{
    if(departament === 'Administrativo'){
      return <FaUsersCog size={60} color={'#fff'} />
    }
  
    if(departament === 'Desenvolvimento'){
      return <FaCode size={60} color={'#fff'} />
    }
  
    if(departament === 'Compras'){
      return <FaShoppingCart size={60} color={'#fff'} />
    }
  }
  
  return (
    <div style={{backgroundColor: color}} className={styles.container} >
      <h3>{departament}</h3>
      <div>
        <h3>{TotalEmployeesDepartment}</h3>
        {chooseIcon(departament)}
      </div>
    </div>
  )
}

export default Card
