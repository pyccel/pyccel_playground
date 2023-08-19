"use client";
import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'
import MonacoEditor from 'react-monaco-editor';

export default function Home() {
  const mobileClasses = ""
  const extendedClasses = ""
  const minimizedClasses = ""
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
  return (
    <main className="flex h-screen w-screen">
      <div className='flex w-full h-full md:flex-row flex-col'>
        <div className='md:w-1/2 w-full flex justify-center h-full border-r-2 md:border-r-black'>
          <div className='w-full flex flex-col '>
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
        </div>

        <div className='md:w-1/2 w-full flex justify-center h-full'>
          <div className='w-full flex flex-col '>
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
      </div>
    </main>
  )
}
