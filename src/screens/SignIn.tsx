import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import backgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
    const navigator = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccout() {
        navigator.navigate("singUp")
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <VStack flex={1}>
                <Image
                    w={'$full'}
                    h={624}
                    source={backgroundImg}
                    alt="Pessoas treinando"
                    defaultSource={backgroundImg}
                    position="absolute"
                />

                <VStack flex={1} px={'$10'} pb={'$16'}>
                    <Center my={'$24'}>
                        <Logo />

                        <Text color="$gray100" fontSize={'$sm'}>Treine sua mente e seu corpo</Text>
                    </Center>

                    <Center gap={'$2'}>
                        <Heading color="$gray100">Acesse a conta</Heading>

                        <Input 
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input 
                            placeholder="Senha"
                            secureTextEntry={true}
                        />

                        <Button title="Enviar" />
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize={'$sm'} mb={'$3'} fontFamily="$body">Ainda não tem acesso?</Text>

                        <Button title="Criar conta" variant="outiline" onPress={handleNewAccout} />
                    </Center>
                </VStack>
        </VStack>
        </ScrollView>
    )
}