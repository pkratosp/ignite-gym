import { Center, Icon, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function Exercise() {

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleBack() {
        navigation.goBack()
    }

    return (
        <VStack flex={1}>
            <VStack px="$8" pt="$12" bg="$gray600">
                <TouchableOpacity onPress={handleBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl" />
                </TouchableOpacity>
            </VStack>
        </VStack>
    )
}