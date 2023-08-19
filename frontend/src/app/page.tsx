"use client";
import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'
import MonacoEditor from 'react-monaco-editor';

export default function Home() {
  const mobileClasses = ""
  const extendedClasses = ""
  const minimizedClasses = ""
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
                options={{
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  automaticLayout: false,
                }}
                onChange={console.log}
                editorDidMount={console.log}
              />
           
          </div>
        </div>

        <div className='md:w-1/2 w-full flex justify-center h-full'>
          <OutputNavbar />

        </div>
      </div>
    </main>
  )
}
