import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import Toolbars from './Toolbars';
import { $getRoot } from 'lexical';
import React, { useState } from 'react';

function Placeholder() {
  return (
    <div className="text-gray-500 overflow-hidden absolute text-ellipsis top-4 left-4 text-sm select-none pointer-events-none">
      Escribe tu noticia aqui....
    </div>
  );
}

function onError(error) {
  console.error(error);
} 

function Editor({ onChange, textColor, setTextColor }) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: {
      ...exampleTheme,
      text: {
        ...exampleTheme.text,
        base: `color: ${textColor}`,
        color: textColor,
      },
    },
    editorState: () => {
      const root = $getRoot();
      if (root) {
        root.style = `color: ${textColor}`;
      }
    },
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
    onUpdate: (editorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const content = root.getTextContent();
        if (onChange) {
          onChange(content);
        }
      });
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbars onChange={onChange} setTextColor={setTextColor} />
      <div className="relative bg-gray-100 p-4 rounded-md h-96 overflow-auto">
        <RichTextPlugin
          contentEditable={<ContentEditable className="focus:outline-none w-full h-full" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

const ContentEditor = ({ onChange }) => {
  const [textColor, setTextColor] = useState('#000000');
  
  return (
    <Editor 
      onChange={onChange} 
      textColor={textColor} 
      setTextColor={setTextColor} // Pass setTextColor here
    />
  );
};

export default ContentEditor;

const exampleTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-bold',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
    h6: 'editor-heading-h6',
  },
  list: {
    nested: {
      listitem: 'ml-4',
    },
    ol: 'list-decimal ml-4',
    ul: 'list-disc ml-4',
    listitem: 'ml-4',
    listitemChecked: 'editor-listItemChecked',
    listitemUnchecked: 'editor-listItemUnchecked',
  },
  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'font-bold',
    code: 'editor-textCode',
    italic: 'italic',
    strikethrough: 'editor-textStrikethrough',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'editor-textUnderline',
    underlineStrikethrough: 'editor-textUnderlineStrikethrough',
  },
  code: 'editor-code',
  placeholder: 'editor-placeholder',
};
