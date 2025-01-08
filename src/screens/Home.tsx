import { useCallback, useEffect, useState } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// api
import { api } from "../lib/axios";
import { AppError } from "@utils/AppError";

// components
import { FlatList } from "react-native";
import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";
import { Group } from "@components/Group";
import { ExerciceCard } from "@components/ExerciceCard";
import { HomeHeader } from "@components/HomeHeader";
import { ToastMessage } from "@components/ToastMessage";
import { Loading } from "@components/Loading";

// tipagens
import { ExercisiesDto } from "../dto/ExercisiesDto";

export function Home() {
  const [exercicies, setExercicies] = useState<ExercisiesDto[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleExercise(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  const toast = useToast();

  async function getAllGroups() {
    try {
      const response = await api.get("/groups");

      setGroups(response.data);
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
    }
  }

  async function getExerciciesByGroup() {
    try {
      setLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercicies(response.data);
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

  useEffect(() => {
    getAllGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getExerciciesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44,
        }}
      />

      {loading === true ? (
        <Loading />
      ) : (
        <VStack px="$8" flex={1}>
          <HStack justifyContent="space-between" mb={"$5"} alignItems="center">
            <Heading color="$gray200" fontSize={"$md"}>
              Exercicios
            </Heading>

            <Text color="$gray200" fontSize={"$md"} fontFamily="$body">
              {exercicies.length}
            </Text>
          </HStack>

          <FlatList
            data={exercicies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ExerciceCard
                item={item}
                onPress={() => handleExercise(item.id.toString())}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
