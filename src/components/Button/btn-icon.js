import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImagesList } from '../../helpers/images'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'

export default function BtnIcon({ disable, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.backgroundButton(disable)}>
                {disable && <ImagesList.btnSend />}
                {!disable && <ImagesList.btnSendActive />}

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backgroundButton: (disable) => ({
        backgroundColor: disable ? Colors.Grey : Colors.Green,
        height: ms(45),
        width: ms(45),
        paddingTop: ms(3),
        paddingRight: ms(3),
        paddingBottom: ms(8),
        paddingLeft: ms(8),
        borderRadius: ms(10)
    })
})