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

import { use, useEffect, useState } from "react";
import { useUIContext } from "@/context/ui.context";
import { ExecOutput, Output } from "@/global/types";
import { useCompileContext } from "@/context/compile.context";
import axios from "axios";
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core'
import { AiFillSave } from 'react-icons/ai'
import { ExecOptions } from "child_process";

const OutputNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();
  const [selectedOutput, setSelectedOutput] = useState<Output>({
    PageTitle: "",
    PageContent: "",
  });
  const [exec, setExec] = useState<ExecOutput>({
    pyccelOutput: "",
    pyccelErrors: "",
    pythonOutput: "",
    pythonErrors: "",
    securityOutput: "",
  });
  const options = compilectx.output.map((item) => ({
    label: item.PageTitle,
    value: item.PageTitle,
  }));

  const handleSelectChange = (selectedValue: string) => {
    console.log("selected value", selectedValue);
    const selected = compilectx.output.find((item) => item.PageTitle === selectedValue);
    if (selected) {
      setSelectedOutput(selected);
      console.log("selected output", selected);
    }
  };

  const headerHeight = uictx.isMobile ? 100 : 60;



  const handleSubmit = async () => {
    console.log("submitting");

    if (compilectx.outLang && compilectx.input) {
      compilectx.setIsLoading(true);
      try {
        const requestData = {
          text: compilectx.input,
          language: compilectx.outLang,
        };
        const instance = axios.create({
          baseURL: "http://localhost:8000",
        });
        const response = await instance.post("/submit-python", requestData);
        console.log("this is submit resp", response.data);

        const outputArray = response.data.map((item: any) => ({
          PageTitle: item.FileName,
          PageContent: item.Content,
        }));

        compilectx.setOutput(outputArray);

        console.log("outlang", compilectx.outLang);
        if (compilectx.outLang === "c") {
          setSelectedOutput(outputArray.find((item) => item.PageTitle === "code_python.c")!);
          // handleSelectChange("code_python.c");
        }
        if (compilectx.outLang === "fortran") {
          setSelectedOutput(outputArray.find((item) => item.PageTitle === "code_python.f90")!);

          // handleSelectChange("code_python.f90");
        }
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

  const handleExecute = async () => {
    console.log("running");
    if (compilectx.outLang && compilectx.input) {
      uictx.setShowTerminal(true);
      compilectx.setIsLoading(true);
      try {
        const requestData = {
          text: compilectx.input,
          language: compilectx.outLang,
        };
        const instance = axios.create({
          baseURL: "http://localhost:8000",
        });
        const response = await instance.post("/execute-python", requestData);
        console.log("this is execute resp", response.data);

        const exec = {
          pyccelOutput: response.data.Pyccel.execution_output,
          pyccelErrors: response.data.Pyccel.error_output,
          pythonOutput: response.data.Python.execution_output,
          pythonErrors: response.data.Python.error_output,
          securityOutput: response.data.Security.Security_report,
        };
        compilectx.setExecOutput(exec);
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

  useEffect(() => {

    compilectx.setSelectedOutput(selectedOutput);
  }, [compilectx.output, selectedOutput]);

  useEffect(() => {
    if (exec.securityOutput) {
      compilectx.setExecOutput(exec);
      console.log("exec", exec);
      console.log("exec output", compilectx.execOutput);
    }
  }
    , [exec, compilectx.execOutput]);



  return (
    <Box className="w-full">
      {
        compilectx.isLoading && <Box sx={{ height: `calc(100% - ${headerHeight}px)` }}>
          <LoadingOverlay loader={customLoader} visible />
        </Box>
      }
      <Header height={headerHeight} px="md" sx={{ width: "100%" }} withBorder>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <div className="flex gap-4">
            <Button
              variant="outline"
              color="gray"
              leftIcon={<AiFillSave className="text-2xl" />}
              onClick={() => handleSubmit()}
            >
              save</Button>
            <Button
              variant="outline"
              color="gray"
              leftIcon={<IconCode />}
              onClick={() => handleExecute()}
            >
              Execute
            </Button>
          </div>

          <Select
            placeholder="Pick a Page"
            data={options}
            onChange={handleSelectChange}
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
