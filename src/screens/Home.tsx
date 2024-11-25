import { ExerciceCard } from "@components/ExerciceCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
    const [exercicies,setExercicies] = useState([
        'Puxada frontal',
        'Remada curvada',
        'Remada unilateral',
        'Levantamento terra',
        'Levantamento terra',
        'Levantamento terra',
        'Levantamento terra',
    ])
    const [groups, setGroups] = useState(['Ombros', 'costas', 'Tríceps', 'Bicepis'])
    const [groupSelected, setGroupSelected] = useState('costas')

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
                    minHeight: 44
                }}
            />

            <VStack px="$8" flex={1}>
                <HStack justifyContent="space-between" mb={"$5"} alignItems="center">
                    <Heading color="$gray200" fontSize={"$md"}>
                        Exercicios
                    </Heading>

                    <Text color="$gray200" fontSize={"$md"} fontFamily="$body">{exercicies.length}</Text>
                </HStack>
                
                <FlatList 
                    data={exercicies}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ExerciceCard />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </VStack>

        </VStack>
    )
}