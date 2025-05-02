import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// Add this import at the top
import { $isListNode } from '@lexical/list';

import {ColorPicker} from './ColorPicker';

export default function Toolbars({ onChange, setTextColor }) {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [textAlignment, setTextAlignment] = useState('left');
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  
  // Remove the standalone list buttons JSX that's outside the return statement
  
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          if (node) {
            const style = node.getStyle();
            const color = style?.match(/color:\s*([^;]+)/)?.[1];
            if (color) {
              setTextColor(color);
            }
          }
        }
      });
    });
  }, [editor, setTextColor]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      
      const node = selection.anchor.getNode();
      const element = node.getParent();
      
      // Fix alignment detection
      const format = element.getFormat();
      const alignment = element.getFormatType();
      setTextAlignment(alignment || 'left');

      // List detection remains the same
      let parent = node.getParent();
      while (parent !== null) {
        if ($isListNode(parent)) {
          const listType = parent.getTag();
          setIsUnorderedList(listType === 'ul');
          setIsOrderedList(listType === 'ol');
          break;
        }
        parent = parent.getParent();
      }
      if (parent === null) {
        setIsUnorderedList(false);
        setIsOrderedList(false);
      }
    }
  }, []);

  // Update the list buttons in the return statement
  // Replace the existing list buttons with:
  <div className="flex gap-1">
    <button
      type="button"
      onClick={() => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }}
      className={`p-1 rounded hover:bg-gray-200 ${
        isUnorderedList ? 'bg-gray-200' : ''
      }`}
      title="Lista con viñetas"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>

    <button
      type="button"
      onClick={() => {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }}
      className={`p-1 rounded hover:bg-gray-200 ${
        isOrderedList ? 'bg-gray-200' : ''
      }`}
      title="Lista numerada"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
        <path d="M2.995 1a.625.625 0 1 0 0 1.25h.38v2.125a.625.625 0 1 0 1.25 0v-2.75A.625.625 0 0 0 4 1H2.995ZM3.208 7.385a2.37 2.37 0 0 1 1.027-.124L2.573 8.923a.625.625 0 0 0 .439 1.067l1.987.011a.625.625 0 0 0 .006-1.25l-.49-.003.777-.776c.215-.215.335-.506.335-.809 0-.465-.297-.957-.842-1.078a3.636 3.636 0 0 0-1.993.121.625.625 0 1 0 .416 1.179ZM2.625 11a.625.625 0 1 0 0 1.25H4.25a.125.125 0 0 1 0 .25H3.5a.625.625 0 1 0 0 1.25h.75a.125.125 0 0 1 0 .25H2.625a.625.625 0 1 0 0 1.25H4.25a1.375 1.375 0 0 0 1.153-2.125A1.375 1.375 0 0 0 4.25 11H2.625ZM7.25 2a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6ZM7.25 7.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6ZM6.5 13.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" />
      </svg>
    </button>
  </div>

  const handleSave = useDebouncedCallback((content) => {
    // Log para depuración
    console.log('JSON completo:', content);
    
    const editorState = JSON.parse(content);
    editor.getEditorState().read(() => {
      const root = $getRoot();
      const textoPlano = root.getTextContent();
      console.log('Solo texto:', textoPlano);
      
      if (onChange) {
        // Enviamos el JSON completo en lugar del texto plano
        onChange(content);
      }
    });
  }, 500);

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
        editorState.read(() => {
          updateToolbar();
        });

        if(dirtyElements.size === 0 && dirtyLeaves.size === 0){
          return;
        }

        handleSave(JSON.stringify(editorState));
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  const handleHeading = (blockType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (blockType === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else if (blockType === 'h3') {
          $setBlocksType(selection, () => $createHeadingNode('h3'));
        } else {
          $setBlocksType(selection, () => $createHeadingNode(blockType));
        }
      }
    });
  };

  return (
    <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-md border-b-2 border-gray-300">
      {/* Undo Button */}
      <button
        type="button"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className={`flex items-center justify-center px-1.5 py-1 size-8 rounded-md ${
          canUndo ? 'text-black hover:bg-gray-200' : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Undo"
        title="Atras"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
          />
        </svg>
      </button>

      {/* Redo Button */}
      <button
        type="button"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className={`flex items-center justify-center -translate-x-1/2 size-8 rounded-md ${
          canRedo
            ? 'text-black hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Redo"
        title='Adelante'
      >
        <svg
          className="w-4 h-4 mt-1 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
          />
        </svg>
     
      </button>

      {/* Bold Button */}
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={`bold size-8 rounded-md ${isBold ? 'bg-gray-200' : ''}`}
         title="Negrilla"
      >
        B
      </button>

      {/* Italic Button */}
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={`italic size-8 rounded-md ${isItalic ? 'bg-gray-200' : ''}`}
         title="Italica"
      >
        i
      </button>

      {/* Text Alignment Buttons */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          className={`p-1 rounded hover:bg-gray-200 ${
            textAlignment === 'left' ? 'bg-gray-200' : ''
          }`}
          title="Alinear a la izquierda"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M3 10H12M3 14H21M3 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          className={`p-1 rounded hover:bg-gray-200 ${
            textAlignment === 'center' ? 'bg-gray-200' : ''
          }`}
          title="Centrar"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M6 10H18M3 14H21M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          className={`p-1 rounded hover:bg-gray-200 ${
            textAlignment === 'right' ? 'bg-gray-200' : ''
          }`}
          title="Alinear a la derecha"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M12 10H21M3 14H21M12 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Add after text alignment buttons and before heading dropdown */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
          className={`p-1  size-7 rounded hover:bg-gray-200 ${
            isUnorderedList ? 'bg-gray-200' : ''
          }`}
          title="Lista con viñetas"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
          className={`p-1 size-7 rounded hover:bg-gray-200 ${
            isOrderedList ? 'bg-gray-200' : ''
          }`}
          title="Lista numerada"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M2.995 1a.625.625 0 1 0 0 1.25h.38v2.125a.625.625 0 1 0 1.25 0v-2.75A.625.625 0 0 0 4 1H2.995ZM3.208 7.385a2.37 2.37 0 0 1 1.027-.124L2.573 8.923a.625.625 0 0 0 .439 1.067l1.987.011a.625.625 0 0 0 .006-1.25l-.49-.003.777-.776c.215-.215.335-.506.335-.809 0-.465-.297-.957-.842-1.078a3.636 3.636 0 0 0-1.993.121.625.625 0 1 0 .416 1.179ZM2.625 11a.625.625 0 1 0 0 1.25H4.25a.125.125 0 0 1 0 .25H3.5a.625.625 0 1 0 0 1.25h.75a.125.125 0 0 1 0 .25H2.625a.625.625 0 1 0 0 1.25H4.25a1.375 1.375 0 0 0 1.153-2.125A1.375 1.375 0 0 0 4.25 11H2.625ZM7.25 2a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6ZM7.25 7.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6ZM6.5 13.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" />
          </svg>
        </button>
      </div>

      {/* Dropdown for Heading */}
      <select
        type="button"
        onChange={(e) => handleHeading(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="paragraph">Parrafo</option>
        <option value="h1">Titulo</option>
        <option value="h2">Subtitulo</option>
        <option value="h3">Sub-subtitulo</option>
      </select>

      {/* Make sure ColorPicker is the last component in the toolbar */}
      <ColorPicker onColorChange={(color) => {
        setTextColor(color);
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.formatText({ color });
          }
        });
      }} />
    </div>
  );
}
