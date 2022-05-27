import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'

export default function Link({ size, title, align, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.link(size, align)}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: (size, align) => ({
        fontSize: size,
        fontWeight: '400',
        color: '#ADADAD',
        textDecorationLine: 'underline',
        textAlign: align
    })
})