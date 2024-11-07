import { VStack, Image, Center, Text, Heading } from "@gluestack-ui/themed";
import backgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { SafeAreaView } from "react-native";
import { Input } from "@components/Input";

export function SignIn() {
    return (
        <VStack flex={1} bg="$gray700">
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
                    </Center>
                </VStack>
        </VStack>
    )
}