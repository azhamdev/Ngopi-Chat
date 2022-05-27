import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../utils/colors'
import HeaderHome from '../../components/HeaderHome'
import { ms } from 'react-native-size-matters'
import Messages from '../../components/Messages'
import { ImagesList } from '../../helpers/images'
import Fire from '../../helpers/config/Fire'
import Gap from '../../components/Gap'
import { getData } from '../../helpers/localStorage'

export default function Home({ navigation, route }) {
    const [users, setUsers] = useState([])
    const listUsers = route.params
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    useEffect(() => {
        callUsers()
    }, [callUsers])

    const callUsers = () => {
        Fire.database().ref('users/').get().then(res => {
            if (res.val())
            {
                const oldData = res.val()
                const data = []
                Object.keys(oldData).map(item => {
                    data.push({
                        id: item,
                        data: oldData[item]
                    })
                })
                setUsers(data)
            }
        })
    }

    // get Data
    const [profile, setProfile] = useState({
        photo: ImagesList.UserPhotoNull,
        fullName: '',
        profession: '',
    })

    useEffect(() => {
        getData('user').then(res => {
            console.log('data user ini yang sedang login dg localstorage (res): ', res)
            const data = res;
            console.log("ini juga sama dari local storage (data): ", data)
            data.photo = { uri: res.photo }
            setCurrentUserProfile(res)
            // console.log(currentUserProfile);
        })
        Fire.database().ref('users/' + Fire.auth().currentUser.uid).once('value').then(snapshot => {
            setProfile(snapshot.val())
            console.log("Diambil dari Database Firebase :", snapshot.val());
        })
    }, [])

    return (
        <View>
            <HeaderHome onPress={() => navigation.navigate('Profile')} />
            <View style={styles.page}>
                {users.map(user => {
                    return (
                        <Messages
                            profile={{ uri: user.data.photo }}
                            name={user.data.fullName}
                            // desc={'Hai lagi apa ?'}
                            onPress={() => navigation.navigate('Chat', user)}
                        />

                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Colors.WhiteCoffee,
        paddingHorizontal: ms(16)
    },
    text: {
        color: Colors.Primary,
        fontSize: ms(16),
        fontWeight: '600'
    },
    img: {
        height: ms(46),
        width: ms(46)
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


//     < FlatList
// data = { users }
// renderItem = { listItem }
// keyExtractor = {(item, index) => index}
// />