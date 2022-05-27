import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import BtnIcon from './btn-icon'
import BtnIconSend from './btn-icon-send'

export default function Button({ type, title, onPress, disable }) {
    if (type === 'btn-icon-send')
    {
        return <BtnIconSend disable={disable} onPress={onPress} />
    }
    if (disable)
    {
        return (
            <View style={styles.disableBgBtn}>
                <Text style={styles.disableText}>{title}</Text>
            </View>
        )
    }
    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>
            <Text style={styles.text(type)}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (type) => ({
        backgroundColor: type === 'Primary' ? Colors.Secondary : Colors.WhiteCoffee,
        paddingVertical: ms(10),
        borderRadius: ms(10),
    }),
    text: (type) => ({
        textAlign: 'center',
        fontSize: ms(18),
        color: type === 'Secondary' ? Colors.Primary : Colors.Primary,
        fontWeight: '600'
    }),
    disableBgBtn: {
        backgroundColor: Colors.Grey,
        paddingVertical: ms(10),
        borderRadius: ms(10),
    },
    disableText: {
        textAlign: 'center',
        fontSize: ms(18),
        color: '#B1B7C2',
        fontWeight: '600'
    }
})