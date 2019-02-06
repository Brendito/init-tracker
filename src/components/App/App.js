import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AddCharacterForm from '../../containers/CharacterFormContainer';
import Tracker from '../Tracker/Tracker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faTimes);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {/* Navigation */}
            {/* Tracker */}
            <Tracker/>
            <AddCharacterForm/>
        </header>
      </div>
    );
  }
}

export default App;
