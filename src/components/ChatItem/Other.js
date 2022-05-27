import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import { ImagesList } from '../../helpers/images'

export default function Other({ text, date, photo }) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={photo} style={styles.avatar} />
            </View>
            <View>
                <View style={styles.chatContent}>
                    <Text style={styles.chatText}>{text}</Text>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chatContent: {
        backgroundColor: Colors.Primary,
        padding: ms(12),
        paddingRight: ms(18),
        borderRadius: ms(10),
        borderBottomLeftRadius: 0
    },
    chatText: {
        color: Colors.Text,
        fontSize: ms(14),
        fontWeight: '400',
        lineHeight: ms(18)
    },
    container: {
        marginBottom: ms(20),
        alignItems: 'flex-end',
        flexDirection: 'row',
        maxWidth: '70%',
    },
    date: {
        fontSize: ms(11),
        marginTop: ms(8)
    },
    avatar: {
        height: ms(35),
        width: ms(35),
        borderRadius: ms(35 / 2),
        marginRight: ms(5)

    }
})