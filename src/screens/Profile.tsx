import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppError } from "@utils/AppError";
import { api } from "../lib/axios";
import { storageSession } from "@storage/storageUser";

type FormType = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  old_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação da senha não confere")
    .when("password", {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação da senha.")
        .transform((value) => (!!value ? value : null)),
    }),
});
export function Profile() {
  const [photoProfile, setPhotoProfile] = useState(
    "https://github.com/pkratosp.png"
  );
  const toast = useToast();

  const { user, updatedDataProfile } = useAuth();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleImagePicker() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (photoSelected.canceled) {
      return;
    }

    const photoUri = photoSelected.assets[0].uri;

    if (photoUri) {
      const photoSize = (await FileSystem.getInfoAsync(photoUri)) as {
        size: number;
      };

      if (photoSize.size && photoSize.size / 1024 / 1024 > 5) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Erro"
              description="Essa imagem é muito grande. Escolha uma de até 5MB"
              action="error"
              onClose={() => toast.close(id)}
            />
          ),
        });
      }

      setPhotoProfile(photoUri);
    }
  }

  async function handleUpdateDataProfile(data: FormType) {
    try {
      setLoadingForm(true);

      const session = await storageSession();
      await api.put("/users", data, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const dataUpdateProfile = user;
      dataUpdateProfile.name = data.name;

      await updatedDataProfile(dataUpdateProfile);
    } catch (error) {
      const isError = error instanceof AppError;

      const title = isError
        ? error.message
        : "Ocorreu um erro inesperado ao atualizar informações do perfil";

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
    } finally {
      setLoadingForm(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Center mt="$6" px="$10">
          <UserPhoto source={photoProfile} alt="imagem perfil" size="xl" />

          <TouchableOpacity onPress={handleImagePicker}>
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
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  bg="$gray600"
                  isReadOnly
                />
              )}
            />
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
            <Controller
              name="old_password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirme a senha"
                  bg="$gray600"
                  secureTextEntry
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              onPress={handleSubmit(handleUpdateDataProfile)}
              isLoading={loadingForm}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
