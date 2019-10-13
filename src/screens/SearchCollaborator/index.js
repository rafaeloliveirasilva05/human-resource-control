import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import styles from './styles.module.css'
import departmentDataJson from '../../data/department.json'
import collaboratorDataJson from '../../data/collaborator.json'
import Card from '../../components/Card'
import { departmentData } from '../../utils'

function SearchCollaborator(props) {
  const [collaboratorName, setCollaboratorName] = useState('')
  const [collaboratorData, setCollaboratorData] = useState([])
  const [fixedListCollaboratorData, setFixedListCollaboratorData] = useState([])

  let history = useHistory()

  useEffect(() => {
    const { colaborator } = collaboratorDataJson
    const { department } = departmentDataJson
    const data = collaboratorsDataMapping(colaborator, department)

    setFixedListCollaboratorData(data)
    setCollaboratorData(data)
  }, [])

  function collaboratorsDataMapping(colaborator, department) {
    return colaborator.map(currentColaborator => {
      const departament = department.find(departament => departament.id === currentColaborator.department)
      const color = departmentData.find(color => color.id === currentColaborator.department)

      return {
        id: currentColaborator.id,
        first_name: currentColaborator.first_name,
        last_name: currentColaborator.last_name,
        active_status: currentColaborator.active_status,
        name_departament: departament.name,
        departamentId: departament.id,
        color_departament: color.color_departament
      }
    })
  }

  function mappingTotalCollaboratorsByDepartment() {
    return departmentData.map(currentDepartment => {
      const allActiveCollaborator = fixedListCollaboratorData.filter(currentElement => {
        return currentElement.active_status && currentElement.departamentId === currentDepartment.id
      })

      return {
        ...currentDepartment,
        TotalEmployeesDepartment: allActiveCollaborator.length
      }
    })
  }

  function renderTableHeader() {
    return (
      <tr>
        <th>
          <div style={{ display: 'flex' }}>Nome</div>
        </th>
        <th>
          <div className={styles.containerLabel}>
            <div>setor</div>
          </div>
        </th>
      </tr>
    )
  }

  function rederTableData() {
    return collaboratorData.map(currentColaborator => {
      return (
        <tr
          key={currentColaborator.id}
          style={{ cursor: 'pointer' }}
          onClick={() => showCollaborator(currentColaborator)}>
          <td>{currentColaborator.first_name}</td>
          <td>
            <div className={styles.containerLabel} >
              <div className={styles.sectorLabel} style={{ backgroundColor: currentColaborator.color_departament }}>
                {currentColaborator.name_departament}
              </div>
            </div>
          </td>
        </tr>
      )
    })
  }

  function showCollaborator(collaborator) {
    history.push("/sobre", collaborator);
  }

  function handleInputChange(event) {
    searchByName(event.target.value)
    setCollaboratorName(event.target.value)
  }

  function searchByName(name) {
    let listCollaborators = fixedListCollaboratorData

    listCollaborators = listCollaborators.filter(collaborator => {
      return collaborator.first_name.toLowerCase().indexOf(name.toLowerCase()) === 0
    })

    setCollaboratorData(listCollaborators)
  }

  return (
    <div className={styles.container}>
      <h2>Quadro de Colaboradores</h2>

      <input
        name='name'
        placeholder='Buscar colaborador'
        value={collaboratorName}
        onChange={handleInputChange}/>

      <div className={styles.containerCard}>
        {mappingTotalCollaboratorsByDepartment().map(element =>
          <div className={styles.itemCard} key={element.id}>
            <Card
              color={element.color_departament}
              departament={element.name_departament}
              TotalEmployeesDepartment={element.TotalEmployeesDepartment} />
          </div>)}
      </div>

      <div style={{ marginTop: '40px' }}>
        {/* <h2 style={{ marginTop: '40px' }}>Total de Colaboradores Ativos</h2> */}
        <div className={styles.containerTeste}>

          <div className={styles.containerFilter}>
            <span>Filtrar por:</span>
            <h4>teste 1</h4>
            <h4>teste 2</h4>
            <h4>teste 3</h4>
            <h4>teste 4</h4>
          </div>

          <div className={styles.containerTable}>
            <table>
              <thead>
                {renderTableHeader()}
              </thead>
              <tbody>
                {rederTableData()}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SearchCollaborator
