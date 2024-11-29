import { Icon, Toast, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

interface Props {
    id: string
    title: string
    description?: string
    onClose: () => void
    action?: 'error' | 'warning' | 'success' | 'info' | 'attention'
}

export function ToastMessage({ id, onClose, title, action = 'success', description }: Props) {
    return (
        <Toast
            nativeID={id}
            action={action}
            bg={action === 'success' ? '$green500' : '$red500'}
            mt="$10"
        >
            <VStack>
                <TouchableOpacity onPress={onClose}>
                    <Icon as={X} color="$coolGray50" size="md" />
                </TouchableOpacity>

                <ToastTitle color="$white" fontFamily="$heading">
                    {title}
                </ToastTitle>

                {
                    description && <ToastDescription color="$white" fontFamily="$body">{description}</ToastDescription>
                }
            </VStack>
        </Toast>
    )
}