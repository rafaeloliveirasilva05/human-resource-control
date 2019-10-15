import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

import styles from './styles.module.css'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { departmentData } from '../../utils'
import LinearProgress from '@material-ui/core/LinearProgress';

function CollaboratorData(props) {
  const [collaboratorData] = useState(props.history.location.state)
  const [showModal, setShowModal] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  let history = useHistory()
  const { id, first_name, last_name, departamentId, active_status } = collaboratorData

  async function disableCollaborator() {
    setLoadingData(true)

    try {
      const response = await axios.put(`http://5da4c58757f48b0014fba345.mockapi.io/api/v1/collaborators/${id}`)

      if (response.status === 200) {
        history.goBack()
      } else {
        alert('Infelizmente não foi possível desabilitar colaborador.')
      }
      setLoadingData(false)

    } catch (error) {
      alert('Infelizmente não foi possível desabilitar colaborador.')
    
    } finally {
      setShowModal(false)
    }
  }

  function mapDepartment(departamentId) {
    return departmentData.find(currentDepartment => currentDepartment.id === departamentId).name_departament
  }

  return (
    <>
      {loadingData ? <LinearProgress /> : null}
      <div className={styles.container}>
        <Modal
          showModal={showModal}
          cancelAction={() => setShowModal(false)}
          acceptAction={() => disableCollaborator()}
          title={'Aviso'}
          message={`Deseja desativar o colaborador:`}
          name={`${first_name} ${last_name}`}>
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
                buttonAction={loadingData ? () => { } : () => history.goBack()}
                label={'Não'}
                buttonColor={loadingData ? 'gray' : 'red'}
                styles={{ padding: '10px 20px', fontSize: '1rem', cursor: loadingData ? 'auto' : 'pointer' }} />

              <Button
                buttonAction={loadingData ? () => { } : () => setShowModal(true)}
                label={'Sim'}
                buttonColor={loadingData ? 'gray' : 'green'}
                styles={{ padding: '10px 20px', fontSize: '1rem', cursor: loadingData ? 'auto' : 'pointer' }} />
            </div>
          </div>
          :
          <div style={{ justifyContent: ' flex-end' }} className={styles.containerDeactivation}>
            <div className={styles.containerButton}>
              <Button
                buttonAction={() => history.goBack()}
                label={'Voltar'}
                buttonColor={'Green'}
                styles={{ padding: '10px 20px', fontSize: '1rem' }} />
            </div>
          </div>
        }
      </div>

    </>
  )
}

export default CollaboratorData
