import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { MdCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

import styles from './styles.module.css'
import departmentDataJson from '../../data/department.json'
import collaboratorDataJson from '../../data/collaborator.json'
import Card from '../../components/Card'
import { departmentData } from '../../utils'

function SearchCollaborator(props) {
  const [collaboratorName, setCollaboratorName] = useState('')
  const [collaboratorData, setCollaboratorData] = useState([])
  const [fixedListCollaboratorData, setFixedListCollaboratorData] = useState([])

  const [administrativeFilter, setAdministrativeFilter] = useState(false)
  const [developmentFilter, setDevelopmentFilter] = useState(false)
  const [purchaseFilter, setPurchaseFilter] = useState(false)
  const [activeStatusFilter, setActiveStatusFilter] = useState(false)
  const [inactiveStatusFilter, setInactiveStatusFilter] = useState(false)
  const [activeFilter, setActiveFilter] = useState(false)

  let history = useHistory()

  useEffect(() => {
    const { colaborator } = collaboratorDataJson
    const { department } = departmentDataJson
    const data = collaboratorsDataMapping(colaborator, department)
    const orderedListContributors = sortList(data)

    setFixedListCollaboratorData(orderedListContributors)
    setCollaboratorData(orderedListContributors)
  }, [])

  useEffect(() => {
    filter()
  }, [administrativeFilter, developmentFilter, purchaseFilter, activeStatusFilter, inactiveStatusFilter])

  function collaboratorsDataMapping(colaborator, department) {
    return colaborator.map(currentColaborator => {
      const departament = department.find(departament => departament.id === currentColaborator.department)
      const color = departmentData.find(color => color.id === currentColaborator.department)

      return {
        id: currentColaborator.id,
        first_name: currentColaborator.first_name,
        last_name: currentColaborator.last_name,
        full_name: `${ currentColaborator.first_name} ${currentColaborator.last_name}`,
        active_status: currentColaborator.active_status,
        name_departament: departament.name,
        departamentId: departament.id,
        color_departament: color.color_departament
      }
    })
  }

  function mappingTotalCollaboratorsByDepartment() {
    return departmentData.map(currentDepartment => {
      const allActiveCollaborator = collaboratorData.filter(currentElement => {
        return currentElement.departamentId === currentDepartment.id
      })

      return {
        ...currentDepartment,
        TotalEmployeesDepartment: allActiveCollaborator.length
      }
    })
  }

  function sortList(collaborators) {
    return collaborators.sort((a, b) => {
      a = a.full_name.toLowerCase()
      b = b.full_name.toLowerCase()
      return a > b ? 1 : b > a ? -1 : 0
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
    if (activeFilter && name.length === 0) {
      filter()
      return
    }

    let listCollaborators = activeFilter ? collaboratorData : fixedListCollaboratorData

    listCollaborators = listCollaborators.filter(collaborator => {
      return collaborator.first_name.toLowerCase().indexOf(name.toLowerCase()) === 0
    })

    setCollaboratorData(listCollaborators)
  }

  function filterByAdministrativeSector() {
    let listCollaborators = fixedListCollaboratorData

    listCollaborators = fixedListCollaboratorData.filter(currentCollaborator => {
      return currentCollaborator.departamentId === 1
    })

    return listCollaborators
  }

  function filterByDevelopmentSector() {
    let listCollaborators = fixedListCollaboratorData

    listCollaborators = fixedListCollaboratorData.filter(currentCollaborator => {
      return currentCollaborator.departamentId === 2
    })

    return listCollaborators
  }

  function filterBySectorPurchase() {
    let listCollaborators = fixedListCollaboratorData

    listCollaborators = fixedListCollaboratorData.filter(currentCollaborator => {
      return currentCollaborator.departamentId === 3
    })

    return listCollaborators
  }

  function filterByActiveContributors(list) {
    return list.filter(currentCollaborator => currentCollaborator.active_status === 1)
  }

  function filterByInactiveContributors(list) {
    return list.filter(currentCollaborator => currentCollaborator.active_status === 0)
  }

  function filter() {
    if (fixedListCollaboratorData.length === 0) return

    let filteredCollaboratorList = []
    let anyActiveFilter = false

    if (administrativeFilter) {
      filteredCollaboratorList = filterByAdministrativeSector()
      anyActiveFilter = true
    }

    if (developmentFilter) {
      filteredCollaboratorList = filterByDevelopmentSector().concat(filteredCollaboratorList)
      anyActiveFilter = true
    }

    if (purchaseFilter) {
      filteredCollaboratorList = filterBySectorPurchase().concat(filteredCollaboratorList)
      anyActiveFilter = true
    }

    if (activeStatusFilter && !inactiveStatusFilter) {
      if (anyActiveFilter) {
        filteredCollaboratorList = filterByActiveContributors(filteredCollaboratorList)
      }
      else {
        filteredCollaboratorList = filterByActiveContributors(fixedListCollaboratorData)
      }

      anyActiveFilter = true
    }

    if (inactiveStatusFilter && !activeStatusFilter) {
      if (anyActiveFilter) {
        filteredCollaboratorList = filterByInactiveContributors(filteredCollaboratorList)
      }
      else {
        filteredCollaboratorList = filterByInactiveContributors(fixedListCollaboratorData)
      }

      anyActiveFilter = true
    }

    filteredCollaboratorList = sortList(filteredCollaboratorList)

    anyActiveFilter ? setActiveFilter(true) : setActiveFilter(false)
    anyActiveFilter ? setCollaboratorData(filteredCollaboratorList) : setCollaboratorData(fixedListCollaboratorData)
  }

  return (
    <div className={styles.container}>

      <div className={styles.containerFilter}>
        <h2 className={styles.titleContainerFilter}>Filtrar por:</h2>
        <section className={styles.containerDepartmentFilter}>
          <h2>Departamento</h2>
          <div className={styles.navDepartamentoFilter}>
            <ul>
              <li
                onClick={() => administrativeFilter ? setAdministrativeFilter(false) : setAdministrativeFilter(true)}
                className={styles.filterListItem}>
                <div className={styles.selectionBox}>
                  {administrativeFilter ?
                    <MdCheckBox size={30} color={'#a9a9a9'} /> :
                    <MdCheckBoxOutlineBlank size={30} color={'#a9a9a9'} />}
                </div>
                <a>Administrativo</a>
              </li>
              <li
                onClick={() => developmentFilter ? setDevelopmentFilter(false) : setDevelopmentFilter(true)}
                className={styles.filterListItem}>
                <div className={styles.selectionBox}>
                  {developmentFilter ?
                    <MdCheckBox size={30} color={'#a9a9a9'} /> :
                    <MdCheckBoxOutlineBlank size={30} color={'#a9a9a9'} />}
                </div>
                <a>Desenvolvimento</a>
              </li>
              <li
                onClick={() => purchaseFilter ? setPurchaseFilter(false) : setPurchaseFilter(true)}
                className={styles.filterListItem}>
                <div className={styles.selectionBox}>
                  {purchaseFilter ?
                    <MdCheckBox size={30} color={'#a9a9a9'} /> :
                    <MdCheckBoxOutlineBlank size={30} color={'#a9a9a9'} />}
                </div>
                <a>Compras</a>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.containerDepartmentFilter}>
          <h2>Status Ativação</h2>
          <div>
            <ul>
              <li
                onClick={() => activeStatusFilter ? setActiveStatusFilter(false) : setActiveStatusFilter(true)}
                className={styles.filterListItem}>
                <div className={styles.selectionBox}>
                  {activeStatusFilter ?
                    <MdCheckBox size={30} color={'#a9a9a9'} /> :
                    <MdCheckBoxOutlineBlank size={30} color={'#a9a9a9'} />}
                </div>
                <a>Ativos</a>
              </li>
              <li
                onClick={() => inactiveStatusFilter ? setInactiveStatusFilter(false) : setInactiveStatusFilter(true)}
                className={styles.filterListItem}>
                <div className={styles.selectionBox}>
                  {inactiveStatusFilter ?
                    <MdCheckBox size={30} color={'#a9a9a9'} /> :
                    <MdCheckBoxOutlineBlank size={30} color={'#a9a9a9'} />}
                </div>
                <a>Inativos</a>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <section style={{ flex: 3 }}>
        <h2>Quadro de Colaboradores</h2>
        <div className={styles.containerCard}>
          {mappingTotalCollaboratorsByDepartment().map(element =>
            <div className={styles.itemCard} key={element.id}>
              <Card
                color={element.color_departament}
                departament={element.name_departament}
                TotalEmployeesDepartment={element.TotalEmployeesDepartment} />
            </div>)}
        </div>

        <div className={styles.containerInput}>
          <input
            name='name'
            placeholder='Buscar colaborador'
            value={collaboratorName}
            onChange={handleInputChange} />
        </div>

        <div className={styles.containerTeste}>
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

      </section>

    </div>
  )
}

export default SearchCollaborator
