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
import { useEffect, useState } from "react";
import { useUIContext } from "@/context/ui.context";
import { Output } from "@/types/global";
import { useCompileContext } from "@/context/compile.context";
import axios from "axios";
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core'

const OutputNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();
  const [selectedOutput, setSelectedOutput] = useState<Output>({
    PageTitle: "",
    PageContent: "",
  });
  const [defaultOutput, setDefaultOutput] = useState<Output>({
    PageTitle: "",
    PageContent: "",
  });

  const options = compilectx.output.map((item) => ({
    value: item.PageTitle,
    label: item.PageTitle,
  }));

  const handleSelectChange = (selectedValue: string) => {
    const selected = compilectx.output.find((item) => item.PageTitle === selectedValue);
    if (selected) {
      setSelectedOutput(selected);
      console.log("selected output", selected);
    }
  };
  const headerHeight = uictx.isMobile ? 100 : 60;

  

  const handleSubmit = async () => {
    console.log("submitting");
    const selectedItem: Output | undefined = compilectx.output.find((item) => item.PageTitle === selectedOutput.PageTitle);
    if (compilectx.outLang && compilectx.input) {
      compilectx.setIsLoading(true);
      try {
        const requestData = {
          text: compilectx.input,
          language: "c",
        };
        const instance = axios.create({
          baseURL: "http://localhost:8000",
        });
        const response = await instance.post("/submit-python", requestData);
        console.log("this is submit resp",response.data);
  
        const outputArray = response.data.map((item: any) => ({
          PageTitle: item.FileName,
          PageContent: item.Content,
        }));
  
        compilectx.setOutput(outputArray);
        console.log("first output", outputArray.find((item) => item.PageTitle === "code_python.c"));
        setSelectedOutput(outputArray[0]);
        console.log("selected output", selectedOutput);
      
      } catch (error) {
        console.error(error);
      } finally {
        compilectx.setIsLoading(false);
      }
    }
    else {
      alert("Please fill all the fields");
    }
  };
  
  useEffect(() => {
    
    compilectx.setSelectedOutput(selectedOutput);
    console.log("selected output in use effect", selectedOutput);
  }, [compilectx.output, selectedOutput]);

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
      <Header height={headerHeight} px="md" sx={{ width: "100%" }} withBorder>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <Button
            variant="outline"
            color="gray"
            leftIcon={<IconCode />}
            onClick={() => handleSubmit()}
          >
            save/load</Button>
          <Select
            placeholder="Pick a Page"
            data={options}
            onChange={handleSelectChange}
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            withinPortal
            defaultValue={"code_python.c"}
          />
        </Group>
      </Header>
    </Box>
  );
};

export default OutputNavbar;
