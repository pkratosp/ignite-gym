import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps

export function ExerciceCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack
                bg="$gray500"
                alignItems="center"
                p="$2"
                pr="$4"
                rounded="$md"
                mb="$3"
            >

                <Image 
                    source={"https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp"}
                    alt="imagem de exercicio"
                    w={"$16"}
                    h={"$16"}
                    rounded="$md"
                    mr="$4"
                    resizeMode="cover"
                />

                <VStack flex={1}>
                    <Heading fontSize="$lg" color="$white" fontFamily="$heading">
                        Puxada frontal
                    </Heading>
                    <Text color="$gray200" fontSize="$sm" numberOfLines={2}>3 séries x 12 repetições</Text>
                </VStack>

            </HStack>
        </TouchableOpacity>
    )
}