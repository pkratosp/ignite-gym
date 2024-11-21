import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import backgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";


export function SignUp() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleGoBack() {
        navigation.goBack()
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

                    <Center gap={'$2'} flex={1}>
                        <Heading color="$gray100">Crie sua conta</Heading>

                        <Input 
                            placeholder="Nome"
                        />

                        <Input 
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input 
                            placeholder="Senha"
                            secureTextEntry={true}
                        />

                        <Button title="Criar e acessar" />
                    </Center>

                    <Button 
                        title="Voltar para o login" 
                        variant="outiline" 
                        mt={'$12'} 
                        onPress={handleGoBack}
                    />
                </VStack>
        </VStack>
        </ScrollView>
    )
}