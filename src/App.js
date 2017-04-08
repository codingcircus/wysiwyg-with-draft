import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Editor from './Components/Editor';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Editor Test</h1>
        </div>
        <Editor />
      </div>
    );
  }
}

export default App;
