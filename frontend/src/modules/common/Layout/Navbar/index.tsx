/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
  Collapse,
} from "@chakra-ui/react";
import { BsFillBrightnessLowFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { ProfileMenu } from "../ProfileMenu";
import { useAppState } from "@store/index";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { GiAxeInStump } from "react-icons/gi";

interface Props {
  children: React.ReactNode;
  href: string;
}
const Links = [
  { label: "Overview", href: "#Overview" },
  { label: "How It Works", href: "#how_it_works" },
  { label: "Features", href: "#feature" },
];

const NavLink = (props: Props) => {
  const { children, href } = props;

  return (
    <Box
      as="a"
      p={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("#dbceff", "gray.700"),
      }}
      color={"#f4a460"}
      href={href}
    >
      {children}
    </Box>
  );
};

export function Navbar() {
  const [state] = useAppState();
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        zIndex={999}
        position="fixed"
        width="100%"
        backdropFilter="blur(20px)"
        px={40}
        transition="background-color 0.3s ease"
      >
        <Flex
          h={16}
          px={8}
          py={8}
          mt={2}
          rounded={"xl"}
          bgColor={"#000"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            aria-label={"Open Menu"}
            display={{ md: "none", base: "inline-flex" }}
            onClick={onToggle}
            bg={useColorModeValue("#dbceff", "#6D63FC")}
          >
            {isOpen ? <GrFormClose /> : <GiHamburgerMenu />}
          </IconButton>
          <Box>
            <Link to="/">
              <Logo />
            </Link>
          </Box>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={7}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button
                  onClick={toggleColorMode}
                  _hover={{ bg: "white" }}
                  bg={"#f4a460"}
                  display={{ base: "none", md: "inline-flex" }}
                >
                  {colorMode === "light" ? (
                    <MdDarkMode />
                  ) : (
                    <BsFillBrightnessLowFill />
                  )}
                </Button>

                {!state.userProfile?.id ? (
                  <Button
                    variant="outline"
                    color={"#f4a460"}
                    rightIcon={<GiAxeInStump />}
                  >
                    <Link to="/ingest-logs">Ingest Logs</Link>
                  </Button>
                ) : (
                  <ProfileMenu />
                )}
              </Stack>
            </Flex>
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} key={link.label}>
                  {link.label}
                </NavLink>
              ))}
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <Button
                  onClick={toggleColorMode}
                  bg={"#a390fe"}
                  color={"#fff"}
                  _hover={{ bg: "#6d63fc" }}
                >
                  {colorMode === "light" ? (
                    <MdDarkMode />
                  ) : (
                    <BsFillBrightnessLowFill />
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
