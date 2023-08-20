"use client";
import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'
import MonacoEditor from 'react-monaco-editor';
import { useState } from 'react';
import { useUIContext } from '../context/ui.context';


export default function Home() {
  const mobileClasses = "w-full flex flex-col justify-center"
  const extendedClasses = "flex-col justify-center "
  const minimizedClasses = "justify-center h-full border-r-2 md:border-r-black"
  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,

  };
  const uictx = useUIContext()
  return (
    <main className="flex w-full h-[calc(100vh-4rem)]">
      <div className={`w-full flex ${uictx.isExtended ? "flex-col" : "flex-row"} ${uictx.revIsExtended ? "flex-col-reverse" : ""}`}>
        <div className={`flex flex-col ${uictx.isExtended || uictx.revIsExtended ? "w-full" : "w-1/2"}`}>
          <EditNavbar />

          <MonacoEditor
            width="100%"
            height="100%"
            language="python"
            theme="vs-dark"
            value="// some comment"
            options={options}
          // onChange={console.log}
          // editorDidMount={console.log}
          />

        </div>

        <div className={`flex flex-col ${uictx.revIsExtended || uictx.isExtended ? "w-full" : "w-1/2"}`}>
          <OutputNavbar />
          <MonacoEditor
            width="100%"
            height="100%"
            language="python"
            theme="vs-dark"
            value="// some comment"
            options={options}
          // onChange={console.log}
          // editorDidMount={console.log}
          />

        </div>
      </div>
    </main>
  )
}
