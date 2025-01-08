import { Fragment, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

// api
import { api } from "../lib/axios";
import { AppError } from "@utils/AppError";

// icons
import { ArrowLeft } from "lucide-react-native";

// images
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

// components
import { ScrollView, TouchableOpacity } from "react-native";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

// tipagem
import { ExercisiesDto } from "../dto/ExercisiesDto";
import { Loading } from "@components/Loading";
import { storageSession } from "@storage/storageUser";

type ExerciseParams = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [loadingMarkRealisation, setLoadingMarkRealisation] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [exerciseDetails, setExerciseDetails] = useState({} as ExercisiesDto);

  const router = useRoute();

  const toast = useToast();

  const { exerciseId } = router.params as ExerciseParams;

  function handleBack() {
    navigation.goBack();
  }

  async function getExerciseById() {
    try {
      setLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);

      setExerciseDetails(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
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
      setLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    setLoadingMarkRealisation(true);
    try {
      const session = await storageSession();
      const response = await api.post(
        "/history",
        { exercise_id: exerciseId },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      // toast.show({
      //   placement: "top",
      //   render: ({ id }) => (
      //     <ToastMessage
      //       id={id}
      //       title="Parabens"
      //       description="Parabéns! Exercício registrado no seu histórico."
      //       action="success"
      //       onClose={() => toast.close(id)}
      //     />
      //   ),
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMarkRealisation(false);
    }
  }

  useEffect(() => {
    getExerciseById();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      {loading === true ? (
        <Loading />
      ) : (
        <Fragment>
          <VStack px="$8" pt="$12" bg="$gray600">
            <TouchableOpacity onPress={handleBack}>
              <Icon as={ArrowLeft} color="$green500" size="xl" />
            </TouchableOpacity>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mt="$8"
              mb="$4"
            >
              <Heading
                fontFamily="$heading"
                fontSize="$lg"
                flexShrink={1}
                color="$gray100"
              >
                {exerciseDetails.name}
              </Heading>

              <HStack alignItems="center">
                <BodySvg />

                <Text color="$gray200" ml="$1" textTransform="capitalize">
                  {exerciseDetails.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView
            contentContainerStyle={{
              paddingBottom: 62,
            }}
            showsVerticalScrollIndicator={false}
          >
            <VStack p="$8">
              <Box rounded="$lg" mb="$3" overflow="hidden">
                <Image
                  source={`${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`}
                  alt="foto do exercicio"
                  w="$full"
                  h="$80"
                  resizeMode="cover"
                />
              </Box>

              <Box bg="$gray600" rounded="$md" px="$4" pb="$4">
                <HStack
                  justifyContent="space-around"
                  alignItems="center"
                  mt="$5"
                  mb="$6"
                >
                  <HStack>
                    <SeriesSvg />

                    <Text color="$gray200" ml="$2">
                      {exerciseDetails.series} series
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionsSvg />

                    <Text color="$gray200" ml="$2">
                      {exerciseDetails.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  title="Marcar como realizado"
                  onPress={() => handleExerciseHistoryRegister()}
                  isLoading={loadingMarkRealisation}
                />
              </Box>
            </VStack>
          </ScrollView>
        </Fragment>
      )}
    </VStack>
  );
}
