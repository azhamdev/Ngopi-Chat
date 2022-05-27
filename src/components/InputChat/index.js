import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import Button from '../../components/Button'

export default function InputChat({ value, onChangeText, onButtonPress }) {
    return (
        <View style={styles.layoutInput}>
            <TextInput
                style={styles.textInput}
                placeholder={"Type your messages here ..."}
                value={value}
                onChangeText={onChangeText} />
            <Button type={'btn-icon-send'} disable={value == null} onPress={onButtonPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.Grey,
        borderRadius: ms(10),
        paddingHorizontal: ms(14),
        // paddingVertical: ms(14),
        fontSize: ms(14),
        flex: 1,
        marginRight: ms(10)
    },
    layoutInput: {
        flexDirection: 'row',
    },
})