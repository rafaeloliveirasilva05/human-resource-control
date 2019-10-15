import React from 'react'

import styles from './styles.module.css'
import Button from '../../components/Button'

const Modal = ({ handleClose, showModal, title, message, name }) => {
  const showHideClassName = showModal ? 'block' : 'none'

  return (
    <div className={styles.modal} style={{ display: showHideClassName }}>
      <section className={styles.modalMain}>
        <div>
          <h1>{title}</h1>
          <h3 className={styles.message}>{message}</h3>
          <h3 className={styles.name}>{name}</h3>
        </div>

        <div className={styles.containerButton}>
          <Button
            buttonAction={handleClose}
            label={'Não'}
            buttonColor={'red'}
            styles={{padding:'10px 20px', fontSize:'1rem'}}
            />

          <Button
            buttonAction={handleClose}
            label={'Sim'}
            buttonColor={'green'} 
            styles={{padding:'10px 20px', fontSize:'1rem'}}
            />
        </div>
      </section>
    </div>
  )
}

export default Modal
