import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ImagesList } from '../../helpers/images'
import { ms } from 'react-native-size-matters'
import { Colors } from '../../utils/colors'
import { getData } from '../../helpers/localStorage'
import Fire from '../../helpers/config/Fire'

export default function HeaderHome({ navigation, onPress, foto }) {
    const [profile, setProfile] = useState({
        photo: ImagesList.UserPhotoNull,
        fullName: '',
        profession: '',
    })

    useEffect(() => {
        getData('user').then(res => {
            console.log("diambil data untuk komponen header Home ", res);
            const data = res;
            data.photo = { uri: res.photo }
            setProfile(res)
        })
    }, [])

    // dibawah ini buat firebasenya 

    // useEffect(() => {
    //     const user = Fire.auth().currentUser;
    //     if (user)
    //     {
    //         console.log("Data User", user);
    //     }

    //     Fire.database().ref('users/' + Fire.auth().currentUser.uid).once('value').then(snapshot => {
    //         console.log(snapshot.val());
    //         setProfile(snapshot.val())
    //     })
    // }, [])

    return (
        <View style={styles.content}>
            <View>
                <ImagesList.Logo2 height={ms(40)} width={ms(120)} />
            </View>
            <TouchableOpacity onPress={onPress}>
                <View>
                    <Image style={styles.img} source={profile.photo} />
                    {/* <Text style={styles.welcome}>Welcome Back ! </Text> */}
                    <Text style={styles.name}>{profile.fullName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: ms(40),
        width: ms(40),
        borderRadius: ms(40 / 2)
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.Primary,
        paddingVertical: ms(25),
        paddingHorizontal: ms(16),
        borderBottomLeftRadius: ms(12),
        borderBottomRightRadius: ms(12),
    },
    welcome: {
        color: Colors.Text
    },
    name: {
        color: Colors.WhiteCoffee,
        fontSize: ms(16)
    }
})


