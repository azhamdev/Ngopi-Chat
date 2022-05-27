import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImagesList } from '../../helpers/images'
import { Colors } from '../../utils/colors'
import Gap from '../Gap'
import { ms } from 'react-native-size-matters'

export default function TabItem({ type, active, title, onPress, onLongPress }) {
    const Icon = () => {
        if (title === 'Home')
        {
            return active ? <ImagesList.ICChat_Active height={ms(24)} width={ms(24)} /> : <ImagesList.ICChat height={ms(24)} width={ms(24)} />
        }
        if (title === 'Messages')
        {
            return active ? <ImagesList.ICMessageActive height={ms(24)} width={ms(24)} /> : <ImagesList.ICMessage height={ms(24)} width={ms(24)} />
        }
        if (title === 'Profile')
        {
            return active ? <ImagesList.ICProfile_Active height={ms(24)} width={ms(24)} /> : <ImagesList.ICProfile height={ms(24)} width={ms(24)} />
        }
        return <ImagesList.ICProfile height={ms(24)} width={ms(24)} />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon />
            <Gap height={ms(8)} />
            <Text style={styles.label(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    label: (active) => ({
        fontSize: ms(12),
        fontWeight: '700',
        color: active ? Colors.Primary : Colors.BottomText
    })
})