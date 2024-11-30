import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import backgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from 'react-hook-form'

interface FormType {
    name: string
    email: string
    password: string
    confirm_password: string
}

export function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormType>()

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSingUp(data: FormType) {
        console.log(data)
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

                        <Controller 
                            control={control}
                            name="name"
                            rules={{
                                required: 'Nome obrigatório'
                            }}
                            render={({ field: { value, onChange, onBlur }, }) => (
                                <Input
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="Nome"
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller 
                            control={control}
                            name="email"
                            rules={{
                                required: 'E-mail obrigatório',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'E-mail invalido'
                                }
                            }}
                            render={({ field: { value, onChange, onBlur }, }) => (
                                <Input
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller 
                            control={control}
                            name="password"
                            rules={{
                                required: 'Senha invalida'
                            }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Input
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller 
                            control={control}
                            name="confirm_password"
                            rules={{
                                required: 'Senha invalida'
                            }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Input
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    errorMessage={errors.confirm_password?.message}
                                />
                            )}
                        />


                        <Button 
                            title="Criar e acessar" 
                            onPress={handleSubmit(handleSingUp)}
                        />
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