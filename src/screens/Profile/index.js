import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import { ImagesList } from '../../helpers/images'
import Gap from '../../components/Gap'
import { getData } from '../../helpers/localStorage'
import Fire from '../../helpers/config/Fire'
import { showMessage } from 'react-native-flash-message'

export default function Profile({ navigation }) {
    const [profile, setProfile] = useState({
        photo: ImagesList.UserPhotoNull,
        fullName: '',
        profession: '',
    })
    useEffect(() => {
        getData('user').then(res => {
            console.log("Data profile berisi :", res);
            const data = res;
            data.photo = { uri: res.photo }
            setProfile(res)
        })

        //  ================= ini buat dari firebasenya =============

        // const user = Fire.auth().currentUser;
        // if (user)
        // {
        //     console.log("Data User", user);
        // }

        // Fire.database().ref('users/' + Fire.auth().currentUser.uid).once('value').then(snapshot => {
        //     console.log(snapshot.val());
        //     setProfile(snapshot.val())
        // })
    }, [])

    const signOut = () => {
        Fire.auth().signOut().then(() => {
            console.log("sukses signout")
            navigation.replace("GetStarted")
        }).catch(err => {
            showMessage({
                message: err.message,
                type: 'danger'
            })
        })
    }
    return (
        <View style={styles.container}>
            <Header title={'Profile'} onPress={() => navigation.navigate('Home')} />
            <View style={styles.content} >
                <View style={styles.imageWrapper}>
                    <Image source={profile.photo} style={styles.avatar} />
                </View>
                <Gap height={ms(26)} />
                <Text style={styles.text}>{profile.fullName}</Text>
                <Gap height={ms(6)} />
                <Text style={styles.description}>{profile.profession}</Text>
                <Gap height={ms(120)} />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={signOut}>
                    <Text style={{ color: 'red' }}>Log Out</Text>
                    <Gap width={ms(14)} />
                    <ImagesList.ICLogout height={ms(30)} width={ms(30)} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Text,
        flex: 1
    },
    avatar: {
        width: ms(110),
        height: ms(110),
        borderRadius: ms(110 / 2)
    },
    imageWrapper: {
        backgroundColor: 'white',
        borderRadius: ms(130 / 2),
        height: ms(130),
        width: ms(130),
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhoto: {
        position: 'absolute',
        bottom: ms(8),
        right: ms(6)
    },
    text: {
        color: Colors.Primary,
        fontSize: ms(24),
        fontWeight: '800',
        // textAlign: 'center'
    },
    description: {
        color: Colors.Primary,
        fontSize: ms(18),
        fontWeight: '200',
        // textAlign: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ms(40)

    }
})