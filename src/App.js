import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Editor Test</h2>
        </div>
        <div className="App-content">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            />
        </div>
      </div>
    );
  }
}

export default App;
