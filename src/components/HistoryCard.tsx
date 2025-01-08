import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { HistoryDto } from "../dto/HistoryDto";

interface Props {
  item: HistoryDto;
}

export function HistoryCard({ item }: Props) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bg="$gray600"
      alignContent="center"
      justifyContent="space-between"
    >
      <VStack flex={1} mr="$5">
        <Heading
          color="$white"
          fontSize="$md"
          fontFamily="$heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {item.name}
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          {item.group}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$md">
        {item.hour}
      </Text>
    </HStack>
  );
}
