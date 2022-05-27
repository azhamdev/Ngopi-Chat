import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'

export default function Gap({ height, width }) {
    return (
        <View style={{ height: height, width: width }}>
        </View>
    )
}

const styles = StyleSheet.create({
})