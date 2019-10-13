import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import styles from './styles.module.css'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { departmentData } from '../../utils'

function CollaboratorData(props) {
  const [collaboratorData] = useState(props.history.location.state)
  const [showModal, setShowModal] = useState(false)

  let history = useHistory()
  const { first_name, last_name, departamentId, active_status } = collaboratorData

  function disableCollaborator() {
    setShowModal(false)
    history.goBack()
  }

  function mapDepartment(departamentId) {
    return departmentData.find(currentDepartment => currentDepartment.id === departamentId).name_departament
  }

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        handleClose={() => disableCollaborator()}
        title={'Aviso'}
        message={`Deseja desativar o colaborador ${first_name} ${last_name}`}>
      </Modal>

      <h1>Dados do colaborador</h1>
      <div>
        <div className={styles.containerData}>
          <label>Nome</label>
          <h4>{`${first_name} ${last_name}`}</h4>
        </div>

        <div className={styles.containerData}>
          <label>Departamento</label>
          <h4>{mapDepartment(departamentId)}</h4>
        </div>

        <div className={styles.containerData}>
          <label>Status</label>
          <h4>{active_status ? 'Ativo' : 'Desativado'}</h4>
        </div>
      </div>

      {active_status
        ?
        <div className={styles.containerDeactivation}>
          <h4>Deseja desiligar esse colaborador ?</h4>
          <div className={styles.containerButton}>
            <Button
              buttonAction={() => history.goBack()}
              label={'Não'}
              buttonColor={'red'} />

            <Button
              buttonAction={() => setShowModal(true)}
              label={'Sim'}
              buttonColor={'green'} />
          </div>
        </div>
        :
        <div style={{ justifyContent: ' flex-end' }} className={styles.containerDeactivation}>
          <div className={styles.containerButton}>
            <Button
              buttonAction={() => history.goBack()}
              label={'Voltar'}
              buttonColor={'Green'} />
          </div>
        </div>
      }
    </div>
  )
}

export default CollaboratorData
