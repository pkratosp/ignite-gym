import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import * as FileSystem from 'expo-file-system'

export function Profile() {
    const [photoProfile, setPhotoProfile] = useState("https://github.com/pkratosp.png")

    async function handleImagePicker () {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4,4],
            allowsEditing: true
        })

        if(photoSelected.canceled) {
            return
        }

        const photoUri = photoSelected.assets[0].uri

        if(photoUri) {
            const photoSize = (await FileSystem.getInfoAsync(photoUri)) as { size: number }

            if(photoSize.size && photoSize.size / 1024 / 1024 > 5) {
                return Alert.alert("Essa imagem é muito grande. Escolha uma de até 5MB")
            }

            setPhotoProfile(photoUri)
        }

    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={photoProfile}
                        alt="imagem perfil"
                        size="xl"
                    />

                    <TouchableOpacity
                        onPress={handleImagePicker}
                    >
                        <Text 
                            color="$green500" 
                            fontFamily="$heading" 
                            fontSize={"$md"} 
                            mt="$4"
                            mb="$8"
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Nome" bg="$gray600" />
                        <Input value="jhondoe@ecori.com.br" bg="$gray600" isReadOnly />
                    </Center>

                    <Heading
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$12"
                        mb="$2"
                    >
                        Alterar senha
                    </Heading>

                    <Center w="$full" gap="$4">
                        <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
                        <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
                        <Input placeholder="Confirme a senha" bg="$gray600" secureTextEntry />

                        <Button title="Atualizar" />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}