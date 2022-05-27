import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImagesList } from '../../helpers/images'
import { ms } from 'react-native-size-matters'
import { Colors } from '../../utils/colors'
import Header from '../../components/Header'
import Fire from '../../helpers/config/Fire'
import { getData } from '../../helpers/localStorage'

export default function MessagesPage({ navigation }) {
    const [userIni, setUserIni] = useState({})
    const [historyChat, setHistoryChat] = useState([])
    // fetching data history chat dari firebase
    useEffect(() => {
        getDataUserFromLocal();
        const rootDB = Fire.database().ref();
        const urlHistory = `messages/${userIni.uid}/`;
        const messagesDB = rootDB.child(urlHistory);
        messagesDB.on("value", async snapshot => {
            // console.log("Data History", snapshot.val());
            if (snapshot.val())
            {
                const oldData = snapshot.val();
                const data = []

                const promises = await Object.keys(oldData).map(async key => {
                    const urlUidOtherUser = `users/${oldData[key].uidPartner}`;
                    const detailOtherUser = await rootDB.child(urlUidOtherUser).once("value");
                    console.log("Detail Other User", detailOtherUser.val());
                    data.push({
                        id: key,
                        detailOtherUser: detailOtherUser.val(),
                        ...oldData[key]
                    })
                })

                await Promise.all(promises);

                console.log("new Data History : ", data);
                setHistoryChat(data);
            }
        })
    }, [userIni.uid])

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            // console.log("User ini yang login di halaman chat:", res);
            setUserIni(res);
        })
    }


    const ListChat = ({ name, desc, photo, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.content}>
                    <View>
                        <Image source={photo} style={styles.avatar} />
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.name}>{name}</Text>
                        <Text>{desc}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Header title={"Messages"} onPress={() => navigation.goBack()} />
            <ScrollView>
                {historyChat.map(chat => {
                    const dataUser = {
                        id: chat.detailOtherUser.uid,
                        data: chat.detailOtherUser
                    }
                    return (
                        <ListChat
                            photo={{ uri: chat.detailOtherUser.photo }}
                            key={chat.id}
                            name={chat.detailOtherUser.fullName}
                            desc={chat.lastContentChat}
                            onPress={() => navigation.navigate("Chat", dataUser)}
                        />
                    )
                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ms(16),
        paddingVertical: ms(20),
        borderBottomWidth: 0.4
    },
    name: {
        fontSize: ms(14),
        fontWeight: '700',
        marginBottom: ms(2)
    },
    textContent: {
        marginLeft: ms(12)
    },
    container: {
        backgroundColor: Colors.WhiteCoffee,
        flex: 1
    },
    avatar: {
        width: ms(40),
        height: ms(40),
        borderRadius: ms(40 / 2)
    }

})