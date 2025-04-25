import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
export default function Toolbars() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
    }
  }, []);

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const handleHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode('h1'));
      }
    });
  };

  return (
    <div className="space-x-3">
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={`bold size-8  rounded-md ${isBold ? 'bg-gray-200' : ''}`}
      >
        B
      </button>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={`italic size-8  rounded-md ${isItalic ? 'bg-gray-200' : ''}`}
      >
        i
      </button>

      <button onClick={handleHeading} className={` size-8  rounded-md `}>
        H1
      </button>
    </div>
  );
}