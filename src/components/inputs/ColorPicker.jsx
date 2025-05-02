

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, TextNode } from 'lexical';
import React, { useState } from 'react';

const themeColors = [
    '#000000', '#FFFFFF', '#1F4E79', '#4F81BD', '#C0504D',
    '#9BBB59', '#8064A2', '#4BACC6', '#F79646'
  ];
  const standardColors = [
    '#FF0000', '#FFFF00', '#00FF00', '#00B0F0', '#0070C0', '#002060', '#7030A0'
  ];

export function ColorPicker({ onColorChange }) {
  const [editor] = useLexicalComposerContext();
  const [showPalette, setShowPalette] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');

  const applyColor = (color) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Apply color to selected text
        selection.getNodes().forEach((node) => {
          if (node instanceof TextNode) {
            node.setStyle(`color: ${color}`);
          }
        });
        // Set default color for future text
        editor._config.theme.text.color = color;
        editor._config.theme.text.default = `color: ${color}`;
      }
    });
    
    setCustomColor(color);
    onColorChange(color);
    setShowPalette(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPalette(!showPalette)}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
        title="Color de texto"
      >
        <div 
          className="w-5 h-5 rounded-full border border-gray-300"
          style={{ backgroundColor: customColor }}
        />
        <span className="text-sm">Color</span>
      </button>

      {showPalette && (
        <div className="absolute z-50 mt-2 p-4 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[240px] right-0">
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Colores del tema</span>
            <div className="grid grid-cols-5 gap-2">
              {themeColors.map((color) => (
                <button
                  key={color}
                  onClick={() => applyColor(color)}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${
                    color === customColor ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{
                    backgroundColor: color,
                    border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none'
                  }}
                  title={color}
                >
                  {color === customColor && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">Colores estándar</span>
            <div className="grid grid-cols-4 gap-2">
              {standardColors.map((color) => (
                <button
                  key={color}
                  onClick={() => applyColor(color)}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                    color === customColor ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer"
              title="Color personalizado"
            />
            <button
              onClick={() => applyColor(customColor)}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              Aplicar color
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  
  