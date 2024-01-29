import { Box, Button, Text } from "@chakra-ui/react";
import { Layout } from "@modules/common/Layout";
import { FaSearchengin } from "react-icons/fa6";
import { GiAxeInStump } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Stack, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "@modules/common/Layout";

export const Home = () => {
  return (
    <Stack
      id="Overview"
      w="full"
      height={"100vh"}
      justify="center"
      textAlign="center"
      bgImage={useColorModeValue(
        "url('/assets/hero-bg.svg')",
        "url('/assets/hero-bg-dark.svg')"
      )}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box w={"full"} position="absolute" top={0} background="transparent">
        <Navbar />
      </Box>
      <Stack
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w={"100vw"}
        px={5}
        py={{ base: 8, md: 10 }}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          maxW="3xl"
        >
          Transforming Logs with{" "}
          <Text
            as={"span"}
            bgGradient={"linear-gradient(to right, #f4a460, #ffd1aa)"}
            bgClip="text"
          >
            LogDash.
          </Text>{" "}
        </Heading>
        <Text color={useColorModeValue("gray.500", "#fff")} maxW={"4xl"}>
          LogDash transforms log management, providing powerful insights and
          analytics. Streamline your log analysis process, gain actionable
          information, and enhance your application's performance. With LogDash,
          managing logs has never been more efficient.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Link to="/search-logs">
            <Button
              rounded={"lg"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              color={"white"}
              colorScheme={"white"}
              bgGradient={"linear-gradient(to right, #f4a460, #ffd1aa)"}
              _hover={{ transform: "scale(1.05)" }}
              leftIcon={<FaSearchengin />}
            >
              Search Logs
            </Button>
          </Link>
          <Link to="/ingest-logs">
            <Button
              rounded={"lg"}
              size={"lg"}
              fontWeight={"normal"}
              px={5}
              colorScheme="gray"
              bg={"transparent"}
              borderWidth={"1px"} // Add the border width here
              _hover={{ transform: "scale(1.05)" }}
              color="#f4a460"
              borderColor={"#f4a460"}
              leftIcon={<GiAxeInStump />}
            >
              Ingest Logs
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};
