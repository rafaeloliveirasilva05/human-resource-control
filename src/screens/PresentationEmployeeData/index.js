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
    </div>
  )
}

export default PresentationEmployeeData
