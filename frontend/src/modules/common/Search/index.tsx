import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { FaSearchengin } from "react-icons/fa";

interface Props {
  name: string;
  type?: string;
  control?: any;
  placeholder?: string;
  disable?: boolean;
  direction?: "row" | "column-reverse" | "column" | "row-reverse";
}

export function SearchBar({
  name,
  type,
  placeholder,
  disable,
  control,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched },
      }) => (
        <Stack w={"md"} bg="white" rounded={"2xl"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <IconButton
                  aria-label="search"
                  size="md"
                  isRound
                  icon={<FaSearchengin color="gray.300" />}
                />
              }
            />
            <Input
              type={type}
              placeholder={placeholder}
              autoFocus={false}
              isDisabled={disable}
              size="lg"
              outline={"none"}
              px={15}
              bg={"white"}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
            />
          </InputGroup>
        </Stack>
      )}
    />
  );
}
