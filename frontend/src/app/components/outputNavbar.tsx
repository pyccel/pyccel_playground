"use client";

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
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useUIContext } from "@/context/ui.context";
import { Output } from "@/types/global";
import { useCompileContext } from "@/context/compile.context";



const OutputNavbar = () => {
  const compilectx = useCompileContext();
  const uictx = useUIContext();
  const outputArray: Output[] = [
    {
      PageTitle: "Default page",
      PageContent: "// just a comment"
    },
    {
      PageTitle: "Title 1",
      PageContent: "Content 1",
    },
    {
      PageTitle: "Title 2",
      PageContent: "Content 2",
    },
  ];
  const [selectedOutput, setSelectedOutput] = useState<Output>({
    PageTitle: "",
    PageContent: "",
  });

  const options = outputArray.map((item) => ({
    value: item.PageTitle,
    label: item.PageTitle,
  }));

  const handleSelectChange = (selectedValue: string) => {
    const selected = outputArray.find((item) => item.PageTitle === selectedValue);
    if (selected) {
      setSelectedOutput(selected);
    }
  };
  const headerHeight = uictx.isMobile ? 100 : 60;


  useEffect(() => {
    compilectx.setSelectedOutput(selectedOutput);
  }, [compilectx, selectedOutput]);

  return (
    <Box className="w-full">
      <Header height={headerHeight} px="md" sx={{ width: "100%" }} withBorder>
        <Group position="apart" sx={{ height: "100%", width: "100%" }} className="w-full">
          <Select
            placeholder="Pick a Page"
            data={options}
            onChange={handleSelectChange}

          />
          <Select
            placeholder="Pick a language"
            data={[
              { value: "C", label: "C" },
              { value: "C++", label: "C++" },
              { value: "Python", label: "Python" },
              { value: "JavaScript", label: "JavaScript" },
            ]}
            
            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
            withinPortal
          />
        </Group>
      </Header>

    </Box>
  );
};

export default OutputNavbar;
