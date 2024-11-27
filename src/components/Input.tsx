import { Input as GlueStackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean
}

export function Input ({isReadOnly = false, ...rest}: Props) {
    return (
        <GlueStackInput 
            h={'$14'} 
            borderWidth={'$0'} 
            borderRadius={'$md'}
            $focus={{
                borderWidth: 1,
                borderColor: '$green400'
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
    )
}