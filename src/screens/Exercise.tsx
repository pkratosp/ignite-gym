import { Box, Center, Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button";

export function Exercise() {

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleBack() {
        navigation.goBack()
    }

    return (
        <VStack flex={1}>
            <VStack px="$8" pt="$12" bg="$gray600">
                <TouchableOpacity onPress={handleBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl" />
                </TouchableOpacity>
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt="$8"
                    mb="$4"
                >
                    <Heading
                        fontFamily="$heading"
                        fontSize="$lg"
                        flexShrink={1}
                        color="$gray100"
                    >
                        Puxada frontal
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />

                        <Text
                            color="$gray200"
                            ml="$1"
                            textTransform="capitalize"
                        >
                            costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 62
                }}
                showsVerticalScrollIndicator={false}
            >
                <VStack p="$8">
                    <Image
                        source={"https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp"}
                        alt="foto do exercicio"
                        w="$full"
                        h="$80"
                        mb="$3"
                        rounded="$lg"
                        resizeMode="cover"
                    />

                    <Box bg="$gray600" rounded="$md" px="$4" pb="$4">
                        <HStack
                            justifyContent="space-around"
                            alignItems="center"
                            mt="$5"
                            mb="$6"
                        >
                            <HStack>
                                <SeriesSvg />

                                <Text color="$gray200" ml="$2">3 series</Text>
                            </HStack>

                            <HStack>
                                <RepetitionsSvg />

                                <Text color="$gray200" ml="$2">12 repetições</Text>
                            </HStack>
                        </HStack>

                        <Button title="Marcar como realizado" />
                    </Box>
                </VStack>
            </ScrollView>

        </VStack>
    )
}