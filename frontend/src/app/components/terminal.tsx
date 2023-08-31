import { useUIContext } from '@/context/ui.context';
import { useCompileContext } from '@/context/compile.context';
import { Box, Container } from '@mantine/core';
import React from 'react'
import { FaExpandAlt } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

const Terminal = () => {
    const compilectx = useCompileContext();
    const uictx = useUIContext();

    const handleExtend = () => {
        uictx.setTerminalExtended(!uictx.terminalExtended);
        if (uictx.terminalRevExtended) {
            uictx.setTerminalRevExtended(false);
        }
        // console.log(uictx.isExtended);
    };

    const handleRevExtend = () => {
        uictx.setTerminalRevExtended(!uictx.terminalRevExtended);
        if (uictx.terminalExtended) {
            uictx.setTerminalExtended(false);
        }
        // console.log(uictx.revIsExtended);
    };

    return (

        <div className={`w-full flex  ${uictx.terminalExtended || uictx.terminalRevExtended ? "flex-col" : "flex-row"}`}>
            <div className={` md:border-r md:border-gray-500 h-full flex flex-col transition-all duration-300 ease-in-out ${uictx.terminalExtended ? "w-full" : "w-1/2"} ${uictx.terminalRevExtended ? "hidden" : ""}`}>
                <div className='h-8 w-full flex gap-3 items-center bg-[#37373b] rounded-sm ' >
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
                        <p className='font-bold text-sm'> python terminal</p>
                    </div>
                </div>
                <div className='h-full w-full flex flex-col p-2'>
                    <p>~ Welcome to pyccel </p>
                    <br />
                    <p className='py-2'>{compilectx?.execOutput.pythonOutput ? compilectx.execOutput.pythonOutput : compilectx.execOutput.pythonErrors}</p>
                </div>

            </div>

            <div className={`h-full flex flex-col transition-all duration-300 ease-in-out md:ml-auto ${uictx.terminalRevExtended ? "w-full" : "w-1/2"} ${uictx.terminalExtended ? "hidden" : ""}`}>
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
                    <div className='flex flex-grow justify-center text-white'>
                        <p className='font-bold text-sm'>{compilectx.outLang ? compilectx.outLang : "Pyccel Terminal"}</p>

                    </div>
                </div>
                <div className='h-full w-full flex flex-col p-2'>
                    <p>~ Welcome to pyccel </p>
                    <br />
                    <p className='py-2'>{compilectx?.execOutput.pyccelOutput ? compilectx.execOutput.pyccelOutput : compilectx.execOutput.pyccelErrors}</p>
                </div>

            </div>



        </div>
    )
}

export default Terminal