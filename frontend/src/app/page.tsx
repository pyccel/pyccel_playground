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
  const handleMobileExtend = () => {
    uictx.setIsExtended(!uictx.isExtended);
    if (uictx.revIsExtended && uictx.isExtended) {
      uictx.setRevIsExtended(false);
    }
  }
  const handleMobileRevExtend = () => {
    uictx.setRevIsExtended(!uictx.revIsExtended);
    if (uictx.isExtended && uictx.revIsExtended) {
      uictx.setIsExtended(false);
    }
  }



  const handleChangeInput = (e: string) => {
    console.log("this is the input", e);
    compilectx.setInput(e);
  };

  return (
    <main className="flex w-full h-[calc(100vh-4rem)]">
      {!uictx.isMobile &&
        <div className={`w-full flex  ${uictx.isExtended || uictx.revIsExtended ? "flex-col" : "flex-row"}`}>
          <div className={`h-full flex flex-col ${uictx.isExtended ? "w-full" : "w-1/2"} ${uictx.revIsExtended ? "hidden" : ""}`}>
            <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm' >
              <div className="w-3 h-3 bg-[#ec695f] right-4 rounded-full">

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
              value="// some comment"
              options={inOptions}
              onChange={(e) => handleChangeInput(e)}
              editorDidMount={console.log}
            />
          </div>

          <div className={`h-full flex flex-col ${uictx.revIsExtended ? "w-full" : "w-1/2"} ${uictx.isExtended ? "hidden" : ""}`}>
            <div className='h-auto w-full justify-end flex' >
              {uictx.revIsExtended ? <AiOutlineFullscreen className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleRevExtend()} /> :
                <AiOutlineFullscreenExit className="font-black text-xl bg-gray-700 hover:bg-gray-500 rounded-sm cursor-pointer" onClick={() => handleRevExtend()} />}
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
              value={compilectx.selectedOutput.PageContent}
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