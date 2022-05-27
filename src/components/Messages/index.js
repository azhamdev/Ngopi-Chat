import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import { ImagesList } from '../../helpers/images'
import Gap from '../Gap'

export default function Messages({ profile, name, desc, onPress, item }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.content}>
                <View>
                    {/* <Image source={ImagesList.UserPic} style={styles.img} /> */}
                    <Image source={profile} style={styles.img} />
                </View>
                <Gap width={ms(14)} />
                <View>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <ImagesList.btnNext />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.Primary,
        fontSize: ms(16),
        fontWeight: '600'
    },
    img: {
        height: ms(46),
        width: ms(46),
        borderRadius: ms(46 / 2)
    },
    content: {
        flexDirection: 'row',
        paddingVertical: ms(20),
        alignItems: 'center'
    },
    desc: {
        fontSize: ms(12),
        fontWeight: '300'
    }
})