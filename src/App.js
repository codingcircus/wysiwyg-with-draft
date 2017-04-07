import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils } from 'draft-js';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import logo from './logo.svg';
import './App.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const plugins = [
  emojiPlugin,
];

class App extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  componentDidMount() {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
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
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
            />
          <EmojiSuggestions />
        </div>
      </div>
    );
  }
}

export default App;
