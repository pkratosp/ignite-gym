import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import backgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

interface FormType {
    name: string
    email: string
    password: string
    confirm_password: string
}

const singUpSchema = yup.object({
    name: yup.string().required('informe o nome'),
    email: yup.string().required('inform o email').email('email invalida'),
    password: yup.string().required('informe a senha').min(6, 'A senha deve conter no minimo 6 caracteres'),
    confirm_password: yup.string().required('informe a confirmação de senha').min(6, 'A senha deve conter no minimo 6 caracteres').oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
})

export function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(singUpSchema)
    })

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