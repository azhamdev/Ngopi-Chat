import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import IsMe from '../ChatItem/isMe'
import Other from './Other'

export default function ChatItem({ isMe, text, date, photo }) {
    if (isMe)
    {
        return <IsMe text={text} date={date} />
    } else
    {
        return <Other text={text} date={date} photo={photo} />
    }
    // return (
    //     <View style={styles.container}>
    //         <IsMe />
    //     </View>
    // )
}

const styles = StyleSheet.create({
    chatContent: {
        backgroundColor: Colors.Text,
        padding: ms(12),
        paddingRight: ms(18),
        maxWidth: '70%',
        borderRadius: ms(10),
        borderBottomRightRadius: 0
    },
    chatText: {
        color: Colors.Primary,
        fontSize: ms(14),
        fontWeight: '400',
        lineHeight: ms(18)
    },
    container: {
        marginBottom: ms(20),
        alignItems: 'flex-end'
    },
    date: {
        fontSize: ms(11),
        marginTop: ms(8)
    }
})