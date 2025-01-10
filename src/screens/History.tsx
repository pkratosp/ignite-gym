import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import { api } from "../lib/axios";
import { HistoryByDayDto } from "../dto/HistoryByDayDto";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { storageSession } from "@storage/storageUser";
import { Loading } from "@components/Loading";

export function History() {
  const [loading, setLoading] = useState<boolean>(false);
  const [exercicies, setExercicies] = useState<HistoryByDayDto[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    setLoading(true);
    try {
      const session = await storageSession();

      const response = await api.get("/history", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setExercicies(response.data);
    } catch (error) {
      const isError = error instanceof AppError;
      const title = isError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";

      //   toast.show({
      //     placement: "top",
      //     render: ({ id }) => (
      //       <ToastMessage
      //         id={id}
      //         title="Erro"
      //         description={title}
      //         action="error"
      //         onClose={() => toast.close(id)}
      //       />
      //     ),
      //   });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico" />

      {loading === true ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercicies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HistoryCard item={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
              {section.title}
            </Heading>
          )}
          ListEmptyComponent={() => (
            <Text color="$gray200" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer execícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            exercicies.length === 0 && { flex: 1, justifyContent: "center" }
          }
        />
      )}
    </VStack>
  );
}
