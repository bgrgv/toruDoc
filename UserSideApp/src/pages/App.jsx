import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import DoctorList from '../component/doctorlist'
import 'bulma/css/bulma.css'
import TimesList from "../component/times-list";
import AddTimeEntryForm from "../component/add-time-entry-form"
import './App.css'
import Index from './index'
import Meeting from './meeting'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="full">
          <Route exact path="/sfe" component={Index} />
          <Route exact path="/" component={DoctorList} />
          <Route path="/meeting" component={Meeting} />
          <Route path="/fw" component={AddTimeEntryForm} />
        </div>
      </Router>
    )
  }
}

export default App
