import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import ChatItem from '../../components/ChatItem'
import InputChat from '../../components/InputChat'
import { getData } from '../../helpers/localStorage'
import Fire from '../../helpers/config/Fire'
import { showMessage } from 'react-native-flash-message'
import { getChatTime, setDateChat } from '../../utils/date'

export default function Chat({ navigation, route }) {
    const dataUser = route.params
    // console.log(dataUser);
    const [chatContent, setChatContent] = useState("");
    const [userIni, setUserini] = useState("");
    const [chatData, setChatData] = useState([]);


    useEffect(() => {
        getDataUserFromLocal()
        const chatId = `${userIni.uid}_${dataUser.data.uid}`
        const urlFirebase = `chatting/${chatId}/allChat/`;
        Fire.database()
            .ref(urlFirebase)
            .on("value", (snapshot) => {
                // console.log("data Chat :", snapshot.val());
                if (snapshot.val())
                {
                    const dataSnapshot = snapshot.val();
                    const allDataChat = [];
                    Object.keys(dataSnapshot).map(key => {

                        const dataChat = dataSnapshot[key];
                        const newDataChat = []

                        Object.keys(dataChat).map(itemChat => {
                            newDataChat.push({
                                id: itemChat,
                                data: dataChat[itemChat]
                            })
                        })

                        allDataChat.push({
                            id: key,
                            data: newDataChat
                        })
                    })
                    console.log("All data chat : ", allDataChat);
                    setChatData(allDataChat)
                }
            })
    }, [dataUser.data.uid, userIni.uid])

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            // console.log("User ini yang login di halaman chat:", res);
            setUserini(res);
        })
    }



    const sendChat = () => {
        // console.log("Userrrrrr :", userIni);
        const today = new Date();

        const data = {
            sendBy: userIni.uid,
            chatDate: today.getTime(),
            chatTime: getChatTime(today),
            chatContent: chatContent
        }

        const chatId = `${userIni.uid}_${dataUser.data.uid}`
        const urlFirebase = `chatting/${chatId}/allChat/${setDateChat(today)}`;
        const urlMessagesUser = `messages/${userIni.uid}/${chatId}`
        const urlMessagesOtherUser = `messages/${dataUser.data.uid}/${chatId}`

        const dataHistoryChatForUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: dataUser.data.uid
        }
        const dataHistoryChatForOtherUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: userIni.uid
        }

        // console.log("Dataa yang akan dikrim :", data)
        // console.log("URL FIREBASE :", urlFirebase);

        // ====== ==== === kirim ke database firebase ==== ==== === ==
        Fire.database()
            .ref(urlFirebase)
            .push(data).then(() => {
                setChatContent("");
                // history for user ini
                Fire.database()
                    .ref(urlMessagesUser)
                    .set(dataHistoryChatForUser)

                // set history for other user 
                Fire.database()
                    .ref(urlMessagesOtherUser)
                    .set(dataHistoryChatForOtherUser)
            }).catch(err => {
                console.log(err.message);
            })

    }


    return (
        <View style={styles.page}>
            <Header title={dataUser.data.fullName} onPress={() => navigation.goBack(null)} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView>
                        {
                            chatData.map(chat => {
                                return (
                                    <View key={chat.id}>
                                        <Text style={styles.date}>{chat.id}</Text>
                                        {chat.data.map(itemChat => {
                                            const isMe = itemChat.data.sendBy === userIni.uid
                                            return <ChatItem
                                                key={itemChat.id}
                                                isMe={isMe}
                                                text={itemChat.data.chatContent}
                                                date={itemChat.data.chatTime}
                                                photo={isMe ? null : { uri: dataUser.data.photo }}
                                            />
                                        })}
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
                </View>
                <InputChat
                    value={chatContent}
                    onChangeText={(value) => setChatContent(value)}
                    onButtonPress={sendChat}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: ms(20),
        paddingHorizontal: ms(16),

    },
    content: {
        // backgroundColor: 'yellow',
        flex: 1
    },
    containerInput: {
        paddingHorizontal: ms(16)
    },
    page: {
        flex: 1,
        backgroundColor: Colors.WhiteCoffee,
    },
    date: {
        fontSize: ms(11),
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: ms(20)
    }
})