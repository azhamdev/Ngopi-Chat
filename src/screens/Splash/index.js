import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../utils/colors'
import { ImagesList } from '../../helpers/images'
import { ms } from 'react-native-size-matters'
import Gap from '../../components/Gap'
import Fire from '../../helpers/config/Fire'

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const unsubcribe = Fire.auth().onAuthStateChanged(user => {
            setTimeout(() => {
                if (user)
                {
                    console.log("Logged");
                    navigation.replace('MainApp')
                } else
                {
                    console.log("Belum Login")
                    navigation.replace("GetStarted")
                }
            }, 3000)
        })

        return () => unsubcribe();
    }, [navigation])

    return (
        <View style={styles.container}>
            <View flex={1.5} justifyContent={'flex-end'}>
                <ImagesList.Logo height={ms(110)} width={ms(110)} />
            </View>
            <View style={styles.footer}>
                <Text>A'zham Albar Rasyid</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        // backgroundColor: 'red',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: ms(40),
        color: Colors.Text
    }
})