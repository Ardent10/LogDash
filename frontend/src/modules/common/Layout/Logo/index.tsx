import { Box, Flex, Image, Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Box>
      <Flex align="center">
        <Image src="/assets/log.png" alt="Logo" width="65px" height="50px" />
        <Text fontSize="2xl" fontWeight="bold" color="#f4a460" ml={2}>
          Log
        </Text>
        <Text fontSize={"2xl"} color={"#fff"}>
          Dash
        </Text>
      </Flex>
    </Box>
  );
}
