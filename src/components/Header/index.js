import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImagesList } from '../../helpers/images'
import { ms } from 'react-native-size-matters'
import { Colors } from '../../utils/colors'

export default function Header({ onPress, title, route }) {
    // const data = route.params
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPress}>
                <ImagesList.ArrowBack />
            </TouchableOpacity>
            <Text style={styles.textHeader}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        paddingTop: ms(30),
        paddingHorizontal: ms(16),
        paddingBottom: ms(30),
        borderBottomEndRadius: ms(10),
        borderBottomLeftRadius: ms(10)
    },
    textHeader: {
        textAlign: 'center',
        flex: 1,
        fontWeight: '600',
        fontSize: ms(20),
        color: Colors.Text
    }
})