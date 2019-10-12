import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import SearchCollaborator from './screens/SearchCollaborator'
import CollaboratorData from './screens/CollaboratorData'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={SearchCollaborator} />
        <Route path="/sobre" component={CollaboratorData} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
