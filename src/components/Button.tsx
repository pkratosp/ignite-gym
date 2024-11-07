import { ButtonSpinner, Button as GlueStackButton, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GlueStackButton> & {
    title: string
    variant?: 'solid' | 'outiline'
    isLoading?: boolean
}

export function Button({ title, variant = 'solid', isLoading = false, ...rest }: Props) {
    return (
        <GlueStackButton 
            w={'$full'}
            h={'$14'}
            bg={variant == 'outiline' ? 'transparent' : '$green700'}
            borderWidth={variant == 'outiline' ? '$1' : '$0'}
            borderColor='$green500'
            rounded={'$sm'}
            $active-bg={variant == 'outiline' ? 'transparent' : '$green500'}
            disabled={isLoading}
            {...rest}
        >
            {
                isLoading ? (
                    <ButtonSpinner color='$white' />
                ) : (
                    <Text color={variant == 'outiline' ? '$green500' : '$white'} fontFamily='$heading' fontSize={'$sm'}>{title}</Text>
                )
            }
        </GlueStackButton>
    )
}