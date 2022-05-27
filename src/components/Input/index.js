import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ms } from 'react-native-size-matters'
import { Colors } from '../../utils/colors'
import Gap from '../Gap'

export default function Input({ title, secure, value, onChangeText }) {
    const [border, setBorder] = useState(Colors.Secondary)
    const onFocusForm = () => {
        setBorder(Colors.Text)
    }

    const onBlurForm = () => {
        setBorder(Colors.Secondary)
    }
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
            <Gap height={ms(6)} />
            <TextInput
                onFocus={onFocusForm}
                onBlur={onBlurForm}
                style={styles.input(border)}
                secureTextEntry={secure}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: (border) => ({
        borderRadius: ms(10),
        borderWidth: ms(1),
        borderColor: border,
        paddingHorizontal: ms(12),
        color: Colors.Text
    }),
    text: {
        color: '#ADADAD',
        fontSize: ms(16),
    }
})