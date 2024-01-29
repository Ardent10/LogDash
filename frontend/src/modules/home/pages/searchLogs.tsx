import { Box, Button, SimpleGrid, Heading } from "@chakra-ui/react";
import { FaSearchengin } from "react-icons/fa6";
import { Stack } from "@chakra-ui/react";
import { Navbar } from "@modules/common/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SearchSchema } from "@utils/validations/validations";
import { InputField } from "@modules/common/Form";
import { useColorModeValue } from "@chakra-ui/react";
import { dateTimeFormat } from "@utils/helperFunctions/globalDateTimeFormat";

export const SearchLogs = () => {
  const defaultValue = {
    level: "",
    message: "",
    resourceId: "",
    fromDate: "",
    toDate: "",
    traceId: "",
    spanId: "",
    commit: "",
    parentResourceId: "",
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(SearchSchema),
    defaultValues: defaultValue,
  });

  const onSubmit = handleSubmit(async (data: any) => {
    alert(JSON.stringify(data));
  });

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
          Explore Logs
        </Heading>
        <Stack
          p={5}
          rounded={"xl"}
          // height={"60vh"}
          border={"1px solid black"}
          bgColor={"#fff3ea"}
          minW={"40vw"}
        >
          <form onSubmit={onSubmit}>
            <SimpleGrid columns={3} spacing={4}>
              <Box>
                <InputField
                  name="level"
                  control={control}
                  type="text"
                  placeholder="Enter Level*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Level"
                />
              </Box>
              <Box>
                <InputField
                  name="message"
                  control={control}
                  type="text"
                  placeholder="Enter Message*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Message"
                />
              </Box>

              <Box>
                <InputField
                  name="resourceId"
                  control={control}
                  type="text"
                  placeholder="Enter Resource Id*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Resource ID"
                />
              </Box>

              <Box>
                <InputField
                  name="fromDate"
                  control={control}
                  type="date"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="From Date"
                  maxDate={dateTimeFormat({
                    dateTime: new Date(),
                    format: "YYYY-MM-DD",
                  })}
                />
              </Box>
              <Box>
                <InputField
                  name="toDate"
                  control={control}
                  type="date"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="To Date"
                  maxDate={dateTimeFormat({
                    dateTime: new Date(),
                    format: "YYYY-MM-DD",
                  })}
                />
              </Box>

              <Box>
                <InputField
                  name="traceId"
                  control={control}
                  type="text"
                  placeholder="Enter Trace Id*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Trace Id"
                />
              </Box>

              <Box>
                <InputField
                  name="spanId"
                  control={control}
                  type="text"
                  placeholder="Enter Span Id*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Span Id"
                />
              </Box>

              <Box>
                <InputField
                  name="commit"
                  control={control}
                  type="text"
                  placeholder="Enter Commit*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Commit"
                />
              </Box>

              <Box>
                <InputField
                  name="parentResourceId"
                  control={control}
                  type="text"
                  placeholder="Enter Parent Resource Id*"
                  disable={false}
                  inputHeadingType="Bold"
                  inputHeadingLabel="Parent Resource Id"
                />
              </Box>
            </SimpleGrid>
            <Box py={2}>
              <Button
                rounded={"lg"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                color={"white"}
                bg={"white"}
                bgGradient={"linear-gradient(to right, #f4a460, #ffd1aa)"}
                _hover={{ transform: "scale(1.05)" }}
                leftIcon={<FaSearchengin />}
                type="submit"
                isDisabled={!Object.values(defaultValue)}
              >
                Search Logs
              </Button>
            </Box>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};
