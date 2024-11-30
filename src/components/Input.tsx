import {
    Input as GlueStackInput,
    InputField,
    FormControlError,
    FormControl,
    FormControlErrorText
} from '@gluestack-ui/themed'

import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean
    errorMessage?: string | null
    isInValid?: boolean
}

export function Input({ isReadOnly = false, errorMessage = null, isInValid = false, ...rest }: Props) {
    const invalid = !!errorMessage || isInValid

    return (
        <FormControl isInvalid={invalid} w="$full">
            <FormControlError mb="$4">
                <FormControlErrorText color="$red500">{errorMessage}</FormControlErrorText>
            </FormControlError>
            <GlueStackInput
                isInvalid={isInValid}
                h={'$14'}
                borderWidth={'$0'}
                borderRadius={'$md'}
                $focus={{
                    borderWidth: 1,
                    borderColor: invalid === true ? "$red500" : '$green400'
                }}
                $invalid={{
                    borderWidth: 1,
                    borderColor: "$red500"
                }}
                isReadOnly={isReadOnly}
                opacity={isReadOnly ? 0.6 : 1}
            >
                <InputField
                    bg='$gray700'
                    color='$white'
                    px={'$4'}
                    fontFamily='$body'
                    placeholderTextColor={'$gray300'}
                    {...rest}
                />

            </GlueStackInput>
        </FormControl>
    )
}