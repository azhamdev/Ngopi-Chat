import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImagesList } from '../helpers/images'
import Button from '../components/Button'
import { ms } from 'react-native-size-matters'
import { Colors } from '../utils/colors'
import Gap from '../components/Gap'

export default function GetStarted({ navigation }) {
    return (
        <View style={styles.page}>
            <View>
                <ImagesList.Logo width={ms(86)} height={ms(86)} />
                <Text style={styles.text}>Ngobrol santai bikin Hepi</Text>
            </View>
            <View>
                <Button title={"Let's Talk"} type={'Primary'} onPress={() => navigation.replace("Login")} />
                <Gap height={ms(16)} />
                <Button title={'Register'} type={'Secondary'} onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: ms(40),
        backgroundColor: Colors.Primary,
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: Colors.Text,
        fontSize: ms(28),
        fontWeight: '600',
        marginTop: ms(90)
    }
})