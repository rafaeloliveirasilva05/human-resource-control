import React from 'react'
import { useState } from 'react'

import styles from './styles.module.css'
import departmentDataJson from '../../data/department.json'
import collaboratorDataJson from '../../data/collaborator.json'
import Card from '../../components/Card'

function PresentationEmployeeData() {
  const [departmentData, setDepartmentData] = useState(departmentDataJson.department)
  const [collaboratorData, setCollaboratorData] = useState(collaboratorDataJson.colaborator)

  const colors = [
    {
      id: 1,
      color: 'green'
    },
    {
      id: 2,
      color: 'red',
    },
    {
      id: 3,
      color: 'blue',
    }
  ]

  function totalInactiveCollaboratorByDepartment(departmentId) {
    const allInactiveCollaborator = collaboratorData.filter(currentElement => {
      if (!currentElement.active_status) {
        return currentElement.department === departmentId
      }
    })

    return allInactiveCollaborator.length
  }

  function totalActiveCollaboratorByDepartment(departmentId) {
    const allActiveCollaborator = collaboratorData.filter(currentElement => {
      if (currentElement.active_status) {
        return currentElement.department === departmentId
      }
    })

    return allActiveCollaborator.length
  }

  function insertTotalCollaboratorColorEachDepartment() {
    const departmentWithColorTotalCollaborator = colors.map(currentColor => {
      const departament = departmentData.find(currentDepatament => currentColor.id === currentDepatament.id)

      return {
        ...currentColor,
        ...departament,
        TotalEmployeesDepartment: totalActiveCollaboratorByDepartment(currentColor.id)
      }
    })

    return departmentWithColorTotalCollaborator
  }

  function rederTableData() {
    return collaboratorData.map(collaborato => {

      const sectorColor = colors.find(color => color.id === collaborato.id)
      const department = departmentData.find(department => department.id === collaborato.department)

      return (
        <tr key={collaborato.id}>
          <td>{collaborato.first_name}</td>
          <td>
            <div className={styles.containerLabel} >
              <div className={styles.sectorLabel} style={{ backgroundColor: sectorColor.color }}>
                {department.name}
              </div>
            </div>
          </td>
        </tr>
      )
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

  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        {insertTotalCollaboratorColorEachDepartment().map(element =>
          <div className={styles.itemCard} key={element.id}>
            <Card
              color={element.color}
              departament={element.name}
              TotalEmployeesDepartment={element.TotalEmployeesDepartment} />
          </div>
        )}
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
  )
}

export default PresentationEmployeeData
