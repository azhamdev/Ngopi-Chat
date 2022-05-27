import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import LottieView from 'lottie-react-native';
import { ms } from 'react-native-size-matters';

export default function Loading() {
    return (
        <View style={styles.content}>
            <LottieView source={require('../../assets/lottie/loading-register.json')} autoPlay={true} loop={true} autoSize={true} />
            <Text style={styles.loadingText}>Loading ...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    loadingText: {
        color: Colors.Grey,
        fontSize: ms(18),
        fontWeight: '600',
        marginTop: ms(12),
    }
})