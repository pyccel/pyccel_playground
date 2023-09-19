"use client";

import {
  Header,
  Group,
  Button,
  Box,
  Select,
} from "@mantine/core";
import {
  IconCode,
} from "@tabler/icons-react";

import { useUIContext } from "@/context/ui.context";
import { useCompileContext } from "@/context/compile.context";
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core'
import { AiFillSave } from 'react-icons/ai'

const OutputNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();

  const options = compilectx.output.map((item) => ({
    label: item.PageTitle,
    value: item.PageTitle,
  }));

  const headerHeight = uictx.isMobile ? 100 : 60;

  const handleSubmit = async () => {
    compilectx.handleSubmit();
  };

  const handleExecute = async () => {
    compilectx.handleExecute();
  };

  const customLoader = (

    <svg
      width="54"
      height="54"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={DEFAULT_THEME.colors.blue[6]}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>

  );



  return (
    <Box className="w-full">
      {
        compilectx.isLoading && <Box sx={{ height: `calc(100% - ${headerHeight}px)` }}>
          <LoadingOverlay loader={customLoader} visible />
        </Box>
      }
      <Header height={headerHeight} px="md" sx={{ width: "100%" }} className=" md:h-52" withBorder>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <div className="flex gap-4">
            <Button
              variant="outline"
              color="gray"
              leftIcon={<AiFillSave className="text-2xl" />}
              onClick={() => handleSubmit()}
            >
              Translate</Button>
            <Button
              variant="outline"
              color="gray"
              leftIcon={<IconCode />}
              onClick={() => {
                // handleExecute()
                alert("Coming Soon . . . ")
              }}
            >
              Execute
            </Button>
          </div>

          <Select
            placeholder="Pick a Page"
            data={options}
            onChange={compilectx.handleSelectChange}
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            withinPortal
            defaultValue={compilectx.outLang === "c" ? "code_python.c" : "code_python.f90"}
          />

        </Group>
      </Header>
    </Box>
  );
};

export default OutputNavbar;
