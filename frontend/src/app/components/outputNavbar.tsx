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

const OutputNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();
  const [selectedOutput, setSelectedOutput] = useState<Output>({
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
    compilectx.setSelectedOutput(selectedOutput);
  }, [compilectx, selectedOutput]);

  return (
    <Box className="w-full">
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
          />
        </Group>
      </Header>

    </Box>
  );
};

export default OutputNavbar;
