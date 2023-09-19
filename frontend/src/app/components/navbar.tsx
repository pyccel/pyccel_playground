"use client";

import { useCompileContext } from "@/context/compile.context";
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
import Link from "next/link";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "Check our Github Repository",
  },

  // {
  //   icon: IconBook,
  //   title: "Documentation",
  //   description: "Check our Readme file for more information",
  // },

];

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const ctx = useCompileContext();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap >
        <a href="http://github.com/pyccel/pyccel" target="_blank" rel="noopener noreferrer" className=" flex gap-2">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </a>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box >
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <div className="flex text-xl font-bold align-bottom items-end gap-2">
            <Image src="https://cdn.discordapp.com/attachments/1100432487894753290/1153640347755348009/pyccel_logo.png" alt="pyccel logo" width={40} height={40} />
             <span className="text-xs align-bottom">Pyccel{' '}{ctx.metadata}</span>
          </div>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >

            <HoverCard
              width={300}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      About
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={1} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        Learn more
                      </Text>
                      <Text size="xs" color="dimmed">
                        Check more details about Pyccel in our docs file
                      </Text>
                    </div>
                    <Link href="http://github.com/pyccel/pyccel" legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">

                        <Button variant="default">Learn More</Button>
                      </a>
                    </Link>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                About
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
