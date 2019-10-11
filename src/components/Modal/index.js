import React from 'react'
import styles from './styles.module.css'

const Modal = ({ handleClose, showModal, title, message }) => {
  const showHideClassName = showModal ? 'block' : 'none'

  return (
    <div className={styles.modal} style={{ display: showHideClassName }}>
      <section className={styles.modalMain}>
        <div>
          <h1>{title}</h1>
          <h3>{message}</h3>
        </div>

        <div className={styles.containerButton}>
          <button className={styles.btVd} onClick={handleClose}>Sim</button>
          <button className={styles.btVm} onClick={handleClose}>Não</button>
        </div>
      </section>
    </div>
  )
}

export default Modal
