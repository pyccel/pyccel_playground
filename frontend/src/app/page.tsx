"use client";
import Image from 'next/image'
import EditNavbar from './components/editorNavbar'
import OutputNavbar from './components/outputNavbar'
// import MonacoEditor from 'react-monaco-editor';
import { useEffect, useState } from 'react';
import { useUIContext } from '../context/ui.context';
import { Button } from '@mantine/core';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useCompileContext } from '@/context/compile.context';
import Editor, { Monaco } from "@monaco-editor/react";
import { GrClose } from 'react-icons/gr'
import { FaExpandAlt } from 'react-icons/fa'
import Terminal from './components/terminal';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsTerminalFill } from 'react-icons/bs'

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
  const uictx = useUIContext();
  const compilectx = useCompileContext();
  // const [dfPage , setDfPage] = useState<string>("");
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

  const handleChangeInput = (e: string | undefined) => {
    console.log("this is the input", e);
    compilectx.setInput(e || "");
  };
  return (
    <main className="flex w-full h-[calc(100vh-4rem)]">
      {
        uictx.showTerminal && <div className='w-full h-full'>
          <Terminal />

        </div>
      }
      {!uictx.isMobile && !uictx.showTerminal &&
        <div className={`w-full flex  ${uictx.isExtended || uictx.revIsExtended ? "flex-col" : "flex-row"}`}>
          <div className={` md:border-r md:border-black h-full flex flex-col transition-all duration-300 ease-in-out ${uictx.isExtended ? "w-full" : "w-1/2"} ${uictx.revIsExtended ? "hidden" : ""}`}>
            <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm py-2' >
              <div className="group ml-2 w-3 h-3 bg-[#ec695f] flex justify-center items-center
               rounded-full">
                <GrClose className="transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleExtend()} />
              </div>
              <div className="group w-3 h-3 bg-[#f1be5b] rounded-full">

              </div>
              <div className=" group w-3 h-3 bg-[#5dc15a] rounded-full flex justify-center items-center">
                <FaExpandAlt className="text-black transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleExtend()} />
              </div>
              <div className='flex flex-grow justify-center text-white'>
                <p className='font-bold text-sm'> main.py</p>
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
              value={compilectx.input}
              options={inOptions}
              onChange={(e) => handleChangeInput(e)}
            // editorDidMount={console.log}
            />
          </div>

          <div className={`h-full flex flex-col transition-all duration-300 ease-in-out md:ml-auto ${uictx.revIsExtended ? "w-full" : "w-1/2"} ${uictx.isExtended ? "hidden" : ""}`}>
            <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm py-2' >
              <div className="group ml-2 w-3 h-3 bg-[#ec695f] flex justify-center items-center
               rounded-full">
                <GrClose className="transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleRevExtend()} />
              </div>
              <div className="group w-3 h-3 bg-[#f1be5b] rounded-full">

              </div>
              <div className=" group w-3 h-3 bg-[#5dc15a] rounded-full flex justify-center items-center">
                <FaExpandAlt className="text-black transition opacity-0 w-2 h-2 group-hover:opacity-100" onClick={() => handleRevExtend()} />
              </div>
              <div className='flex flex-grow justify-center text-white'>
                <p className='font-bold text-sm'> {compilectx.selectedOutput.PageTitle}</p>
              </div>
            </div>
            <OutputNavbar />
            {
              compilectx.defaultPage ?
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
                :
                <Editor
                  width="100%"
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value="// nothing to show"
                  options={outOptions}
                // onChange={console.log}
                // editorDidMount={console.log}
                />
            }


          </div>



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
      <div className=" absolute bottom-2 right-2 flex flex-col gap-4 mr-4 mb-4 ">
        <BsTerminalFill className={`text-3xl cursor-pointer ${uictx.showTerminal ? "text-orange-300 hover:text-orange-400 duration-300" : "text-gray-300 hover:text-gray-400 duration-300"}`} onClick={() => uictx.setShowTerminal(!uictx.showTerminal)} />
      </div>
    </main>
  )
}