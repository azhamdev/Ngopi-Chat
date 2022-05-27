import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../utils/colors'
import { ImagesList } from '../../helpers/images'
import Button from '../../components/Button'
import Link from '../../components/Link'
import Gap from '../../components/Gap'
import { ms } from 'react-native-size-matters'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message'
import Fire from '../../helpers/config/Fire'
import { storeData } from '../../helpers/localStorage'

export default function UploadFoto({ navigation, route }) {
    const { fullName, profession, email, uid } = route.params;
    const [photoForDB, setPhotoForDB] = useState('')
    const [hasPhoto, setHasPhoto] = useState(false)
    const [photo, setPhoto] = useState(ImagesList.UserPhotoNull)
    const [btnContinue, setBtnContinue] = useState(true)

    const getImage = () => {
        launchImageLibrary(
            {
                includeBase64: true,
                quality: 0.4,
                maxWidth: ms(200),
                maxHeight: ms(200)
            },
            response => {
                if (response.didCancel)
                {
                    console.log(response.didCancel);
                    showMessage({
                        message: "Oops, Haven't uploaded a photo yet",
                        type: 'warning',
                        duration: 3000
                    })
                } else
                {
                    console.log('response getImage', response)
                    setPhotoForDB(`data:${response.assets[0].type};base64, ${response.assets[0].base64}`)

                    // console.log('foto for db', photoForDB);
                    const source = { uri: response.assets[0].uri }
                    setPhoto(source);
                    setHasPhoto(true);
                    setBtnContinue(false)
                }
            }
        )
    };

    const uploadAndContinue = () => {
        Fire.database()
            .ref("users/" + uid + "/")
            .update({ photo: photoForDB })

        const data = route.params;
        data.photo = photoForDB;

        storeData('user', data);
        navigation.replace("MainApp")
    }


    return (
        <View style={styles.page}>
            <Header title={"Upload Foto"} onPress={() => navigation.navigate("GetStarted")} />
            <Gap height={ms(70)} />
            <View style={styles.container}>
                <View justifyContent={'center'} alignItems={'center'}>
                    <TouchableOpacity style={styles.imageWrapper} onPress={getImage}>
                        <Image source={photo} style={styles.avatar} />
                        {hasPhoto && <View style={styles.addPhoto}>
                            <ImagesList.btnDeletePhoto />
                        </View>}
                        {!hasPhoto && <View style={styles.addPhoto}>
                            <ImagesList.btnAddPhoto />
                        </View>}

                    </TouchableOpacity>
                    <Gap height={ms(26)} />
                    <Text style={styles.text}>{fullName}</Text>
                    <Gap height={ms(6)} />
                    <Text style={styles.description}>{profession}</Text>
                    <Gap height={ms(6)} />
                    {/* <Text style={styles.description}>{email}</Text> */}
                </View>
                <View>
                    <Button title={"Upload and Continue"} type={'Primary'} onPress={uploadAndContinue} disable={btnContinue} />
                    <Gap height={ms(30)} />
                    <Link title={'Skip for this'} size={ms(13)} align={'center'} onPress={() => navigation.replace('MainApp')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Colors.Primary,
        flex: 1
    },
    text: {
        color: Colors.Text,
        fontSize: ms(24),
        fontWeight: '600',
        // textAlign: 'center'
    },
    description: {
        color: Colors.Text,
        fontSize: ms(18),
        fontWeight: '300',
        // textAlign: 'center'
    },
    container: {
        paddingHorizontal: ms(40),
        paddingVertical: ms(40),
        flex: 1,
        // backgroundColor: 'yellow',
        justifyContent: 'space-between'
        // flex: 1


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
    }

})