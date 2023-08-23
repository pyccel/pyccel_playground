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

  const checkFilled = () => {
    console.log("fields", compilectx.inLang, compilectx.outLang, compilectx.input);
    if (compilectx.inLang && compilectx.outLang && compilectx.input) {
      compilectx.setIsFilled(true);
      console.log(compilectx.selectedOutput);
    }
    else {
      compilectx.setIsFilled(false);
      alert("Please fill all the fields");
    }
  };
  const handleSubmit = () => {
    console.log("submitting");
    checkFilled();
    if (compilectx.isFilled) {
      
      compilectx.setIsLoading(true);
      try {
        const instance = axios.create({
          baseURL: "http://localhost:8000",
        });
        instance
        .post("/submit-python", null, {
          params: {
            text: compilectx.input,
            language: "c",
          },
        })
          .then((res) => {
            console.log(res.data);
            const outputArray = res.data.map((item) => {
              return {
                PageTitle: item.FileName,
                PageContent: item.Content,
              };
            });
            compilectx.setOutput(outputArray);
            compilectx.setIsLoading(false);
          }
          );
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("output", compilectx.output);
  }
  , [compilectx.output]);



  const headerHeight = uictx.isMobile ? 100 : 60;

  return (
    <Box className="w-full">
      <Header height={headerHeight} px="md" sx={{ width: "100%" }}>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <Button color="gray" radius="xs" uppercase onClick={handleSubmit}>save/load</Button>
          <Select
            placeholder="Pick a language"
            data={[
              { value: "C", label: "C", selected: true },
              { value: "C++", label: "C++" },
              { value: "Python", label: "Python" },
              { value: "JavaScript", label: "JavaScript" },
            ]}
            defaultValue={"C"}
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
          />

        </Group>
      </Header>
    </Box>
  );
};

export default EditNavbar;
