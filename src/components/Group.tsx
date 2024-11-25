import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
    name: string
    isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Button 
            mr={"$3"}
            minWidth={"$24"}
            h={"$10"}
            bg={"$gray600"}
            $active-bg="$green500"
            rounded={"$md"}
            justifyContent="center"
            alignItems="center"
            borderWidth={isActive === true ? 1 : 0}  
            {...rest}
        >
            <Text
                color={isActive ? "$green500" : '$gray200'}
                fontSize={"$xs"}
                fontFamily="$heading"
                textTransform="uppercase"
            >
                {name}
            </Text>
        </Button>
    )
}