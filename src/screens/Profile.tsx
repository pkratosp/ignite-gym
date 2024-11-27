import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Text, VStack } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";

export function Profile() {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={"https://github.com/pkratosp.png"}
                        alt="imagem perfil"
                        size="xl"
                    />

                    <TouchableOpacity>
                        <Text 
                            color="$green500" 
                            fontFamily="$heading" 
                            fontSize={"$md"} 
                            pt="$8"
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Nome" bg="$gray600" />
                        <Input value="jhondoe@ecori.com.br" bg="$gray600" isReadOnly />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}