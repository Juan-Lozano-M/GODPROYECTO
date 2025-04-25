import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';

export default function Toolbars() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
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
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className={`flex items-center gap-1 px-1.5 py-1 rounded-md ${
          canUndo
            ? 'text-black hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Undo"
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
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className={`flex items-center gap-1 px-1.5 py-1 rounded-md ${
          canRedo
            ? 'text-black hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Redo"
      >
        <svg
          className="w-4 h-4 rotate-180"
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
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={`bold size-8 rounded-md ${isBold ? 'bg-gray-200' : ''}`}
      >
        B
      </button>

      {/* Italic Button */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={`italic size-8 rounded-md ${isItalic ? 'bg-gray-200' : ''}`}
      >
        i
      </button>

      {/* Dropdown for Heading */}
      <select
        onChange={(e) => handleHeading(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="paragraph">Parrafo</option>
        <option value="h1">Titulo</option>
        <option value="h2">Subtitulo</option>
        <option value="h3">Sub-subtitulo</option>
      </select>
    </div>
  );
}