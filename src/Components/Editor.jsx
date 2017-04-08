import React, { Component } from "react";
import DraftEditor from "draft-js-plugins-editor";
import { EditorState, RichUtils } from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createInlineToolbarPlugin, {
  Separator
} from "draft-js-inline-toolbar-plugin";
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
  CodeBlockButton
} from "draft-js-buttons";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import 'draft-js-linkify-plugin/lib/plugin.css';
import '../css/Editor.css';

// Create Draft JS Plugins
const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
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
const plugins = [
  emojiPlugin,
  inlineToolbarPlugin,
  linkifyPlugin,
];

// Get Components from DraftJS Plugins
const { EmojiSuggestions } = emojiPlugin;
const { InlineToolbar } = inlineToolbarPlugin;

export default class Editor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  blockStyle = (contentBlock) => {
    const type = contentBlock.getType();
    console.log(type);
    return `draftEditor${this.getTypeClass(type)}`;
  };

  getTypeClass(type) {
    switch(type) {
      case 'pre':
      return 'Pre';
      case 'unstyled':
      return 'Unstyled';
      case 'blockquote':
      return 'Blockquote';
      case 'header-one':
      return 'H1';
      case 'header-two':
      return 'H2';
      case 'header-three':
      return 'H3';
      case 'code-block':
      return 'CodeBlock';
      default:
      return '';
    }
  }

  render() {
    return (
      <div className="App-content" onClick={this.focus}>
        <DraftEditor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={plugins}
          blockStyleFn={this.blockStyle}
          ref={element => {
            this.editor = element;
          }}
        />
        <EmojiSuggestions />
        <InlineToolbar />
      </div>
    );
  }
}
