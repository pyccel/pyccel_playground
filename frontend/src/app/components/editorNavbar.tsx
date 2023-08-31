"use client";

import { useCompileContext } from "@/context/compile.context";
import { useUIContext } from "@/context/ui.context";
import {
  Header,
  Group,
  Button,

  Box,

  Select,
} from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";



const EditNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();




  // useEffect(() => {
  //   console.log("output", compilectx.output);
  // }
  //   , [compilectx.output]);

  const headerHeight = uictx.isMobile ? 100 : 60;

  const handleChangeLang = (e: string) => {
    compilectx.setOutLang(e);
    console.log("lang", e);
  };


  return (
    <Box className="w-full">
      <Header height={headerHeight} px="md" sx={{ width: "100%" }}>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <h1 className="text-lg font-medium">Python</h1>
          <div className="flex gap-2 items-center justify-center">
            <label htmlFor="">Language:</label>
            <Select
              placeholder="Pick a language"
              data={[
                { value: "fortran", label: "Fortran" },
                { value: "c", label: "C" },
              ]}
              defaultValue={compilectx.outLang}
              transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
              onChange={(e) => handleChangeLang(e)}
            />
          </div>
        </Group>
      </Header>
    </Box>
  );
};

export default EditNavbar;
