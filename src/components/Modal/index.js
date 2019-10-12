import React from 'react'

import styles from './styles.module.css'
import Button from '../../components/Button'

const Modal = ({ handleClose, showModal, title, message }) => {
  const showHideClassName = showModal ? 'block' : 'none'

  return (
    <div className={styles.modal} style={{ display: showHideClassName }}>
      <section className={styles.modalMain}>
        <div>
          <h1 className={styles.tes}>{title}</h1>
          <h3>{message}</h3>
        </div>

        <div className={styles.containerButton}>
          <Button
            buttonAction={handleClose}
            label={'Não'}
            buttonColor={'red'} />

          <Button
            buttonAction={handleClose}
            label={'Sim'}
            buttonColor={'green'} />
        </div>
      </section>
    </div>
  )
}

export default Modal
