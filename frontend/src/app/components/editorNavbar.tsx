"use client";

import { useCompileContext } from "@/context/compile.context";
import { useUIContext } from "@/context/ui.context";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Select,
} from "@mantine/core";



const EditNavbar = () => {
  const compilectx = useCompileContext();
  const handleSubmit = () => {
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

  return (
    <Box className="w-full">
      <Header height={60} px="md" sx={{ width: "100%" }}>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <Button color="gray" radius="xs" uppercase onClick={handleSubmit}>save/submit</Button>
          <Select
            placeholder="Pick a language"
            data={[
              { value: "C", label: "C" },
              { value: "C++", label: "C++" },
              { value: "Python", label: "Python" },
              { value: "JavaScript", label: "JavaScript" },
            ]}
          />

        </Group>
      </Header>
    </Box>
  );
};

export default EditNavbar;
