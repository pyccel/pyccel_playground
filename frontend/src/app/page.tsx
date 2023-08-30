"use client";
import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'
// import MonacoEditor from 'react-monaco-editor';
import { useState } from 'react';
import { useUIContext } from '../context/ui.context';
import { Button } from '@mantine/core';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useCompileContext } from '@/context/compile.context';
import Editor, { Monaco } from "@monaco-editor/react";
import { GrClose } from 'react-icons/gr'
import { FaExpandAlt } from 'react-icons/fa'
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

export default function Home() {
  const inOptions = {
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
  const outOptions = {
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
    readOnly: true,
    cursorStyle: 'line',
    automaticLayout: true,

  };
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>
  ]);
  const uictx = useUIContext();
  const compilectx = useCompileContext();
  const handleExtend = () => {
    uictx.setIsExtended(!uictx.isExtended);
    if (uictx.revIsExtended) {
      uictx.setRevIsExtended(false);
    }
    console.log(uictx.isExtended);
  };
  const handleRevExtend = () => {
    uictx.setRevIsExtended(!uictx.revIsExtended);
    if (uictx.isExtended) {
      uictx.setIsExtended(false);
    }
  };

  const handleChangeInput = (e: string) => {
    console.log("this is the input", e);
    compilectx.setInput(e);
  };

  return (
    <main className="flex w-full h-[calc(100vh-4rem)]">
      {!uictx.isMobile && 
        <div className={`w-full flex  ${uictx.isExtended || uictx.revIsExtended ? "flex-col" : "flex-row"}`}>
          <div className={` md:border-r md:border-black h-full flex flex-col transition-all duration-300 ease-in-out ${uictx.isExtended ? "w-full" : "w-1/2"} ${uictx.revIsExtended ? "hidden" : ""}`}>
            <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm' >
              <div className="group ml-2 w-3 h-3 bg-[#ec695f] flex justify-center items-center
               rounded-full">
                <GrClose className="transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleExtend()} />
              </div>
              <div className="group w-3 h-3 bg-[#f1be5b] rounded-full">

              </div>
              <div className=" group w-3 h-3 bg-[#5dc15a] rounded-full flex justify-center items-center">
                <FaExpandAlt className="text-black transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleExtend()} />
              </div>

              {/* {uictx.isExtended ? <AiOutlineFullscreen className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleExtend()} /> :
                <AiOutlineFullscreenExit className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleExtend()} />} */}
            </div>
            <EditNavbar />

            <Editor
              width="100%"
              height="100%"
              language="python"
              theme="vs-dark"
              value="print('hi')"
              options={inOptions}
              onChange={(e) => handleChangeInput(e)}
              editorDidMount={console.log}
            />
          </div>

          <div className={`h-full flex flex-col transition-all duration-300 ease-in-out md:ml-auto ${uictx.revIsExtended ? "w-full" : "w-1/2"} ${uictx.isExtended ? "hidden" : ""}`}>
            <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm' >
              <div className="group ml-2 w-3 h-3 bg-[#ec695f] flex justify-center items-center
               rounded-full">
                <GrClose className="transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleRevExtend()} />
              </div>
              <div className="group w-3 h-3 bg-[#f1be5b] rounded-full">

              </div>
              <div className=" group w-3 h-3 bg-[#5dc15a] rounded-full flex justify-center items-center">
                <FaExpandAlt className="text-black transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleRevExtend()} />
              </div>

              {/* {uictx.isExtended ? <AiOutlineFullscreen className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleExtend()} /> :
                <AiOutlineFullscreenExit className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleExtend()} />} */}
            </div>
            <OutputNavbar />
            <Editor
              width="100%"
              height="100%"
              language="python"
              theme="vs-dark"
              value={compilectx.selectedOutput.PageContent}
              options={outOptions}
            // onChange={console.log}
            // editorDidMount={console.log}
            />

          </div>
          {/* {
            !showTerminal && <div className="h-full w-1/4 bg-gray-700">
              <Terminal name='React Terminal Usage Example' colorMode={ ColorMode.Light }  onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }>
        { terminalLineData }
      </Terminal>
            </div>
          } */}
        </div>
      }
      {
        uictx.isMobile && <div className="w-full flex flex-col">
          <div className='h-screen w-full flex flex-col'>
            <EditNavbar />
            <Editor
              width="100%"
              height="100%"
              language="python"
              theme="vs-dark"
              value="// some comment"
              options={inOptions}
            // onChange={console.log}
            // editorDidMount={console.log}
            />
          </div>
          <div className="flex flex-col h-screen w-full">

            <OutputNavbar />
            <Editor
              width="100%"
              height="100%"
              language="python"
              theme="vs-dark"
              value={compilectx?.selectedOutput?.PageContent}
              options={outOptions}
            // onChange={console.log}
            // editorDidMount={console.log}
            />
          </div>
        </div>
      }
    </main>
  )
}