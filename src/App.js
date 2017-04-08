import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import {
  ItalicButton,
  BoldButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import logo from './logo.svg';
import './App.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    Separator,
    BoldButton,
    ItalicButton,
    UnorderedListButton,
    OrderedListButton,
    CodeButton,
    Separator,
    BlockquoteButton,
    CodeBlockButton,
  ]
});
const { InlineToolbar } = inlineToolbarPlugin;

const plugins = [
  emojiPlugin,
  inlineToolbarPlugin,
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
