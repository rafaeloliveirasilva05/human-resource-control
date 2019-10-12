import React from 'react'
import styles from './styles.module.css'

const Button = ({ label, buttonColor, styles, buttonAction }) => {
  return (
    <button
      onClick={buttonAction}
      style={{ backgroundColor: buttonColor, ...styles }}>
      {label}
    </button>
  )
}

export default Button