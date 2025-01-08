import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

import Logo from "@assets/logo.svg";
import backgroundImg from "@assets/background.png";

import * as yup from "yup";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "@gluestack-ui/themed";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import { AppError } from "@utils/AppError";
import { useState } from "react";

const signInSchema = yup.object({
  email: yup.string().required().email("Informe o e-mail"),
  password: yup.string().required(),
});

type SignInType = {
  email: string;
  password: string;
};

export function SignIn() {
  const { signIn } = useAuth();
  const navigator = useNavigation<AuthNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleNewAccout() {
    navigator.navigate("singUp");
  }

  const toast = useToast();

  const { control, handleSubmit } = useForm<SignInType>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn(data: SignInType) {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AppError) {
        const title = error.message
          ? error.message
          : "Não foi possível entrar. Tente novamente mais tarde.";

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Erro"
              description={title}
              action="error"
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1}>
        <Image
          w={"$full"}
          h={624}
          source={backgroundImg}
          alt="Pessoas treinando"
          defaultSource={backgroundImg}
          position="absolute"
        />

        <VStack flex={1} px={"$10"} pb={"$16"}>
          <Center my={"$24"}>
            <Logo />

            <Text color="$gray100" fontSize={"$sm"}>
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center gap={"$2"}>
            <Heading color="$gray100">Acesse a conta</Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, ref, onBlur } }) => (
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, ref, onBlur } }) => (
                <Input
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Senha"
                  secureTextEntry={true}
                />
              )}
            />

            <Button
              title="Enviar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text
              color="$gray100"
              fontSize={"$sm"}
              mb={"$3"}
              fontFamily="$body"
            >
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar conta"
              variant="outiline"
              onPress={handleNewAccout}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
