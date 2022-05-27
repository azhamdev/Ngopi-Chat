import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Gap from '../../components/Gap'
import { useForm } from '../../helpers/useForm'
import Fire from '../../helpers/config/Fire'
import Loading from '../../components/Loading'
import Link from '../../components/Link'
import { showMessage, hideMessage } from "react-native-flash-message";
import { getData, storeData } from '../../helpers/localStorage'

export default function Register({ navigation }) {
    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    // trigger buttonnya
    const onContinue = () => {
        console.log(form)

        setLoading(true)
        Fire.auth().createUserWithEmailAndPassword(form.email, form.password)
            .then((success) => {
                setLoading(false)
                // setNext(true)
                setForm('reset')

                const data = {
                    fullName: form.fullName,
                    profession: form.profession,
                    email: form.email,
                    uid: success.user.uid
                }

                Fire.database()
                    .ref("users/" + success.user.uid + "/")
                    .set(data)

                storeData("user", data);

                navigation.navigate('Upload Foto', data)
                console.log("Register Success : ", success)
            })
            .catch((error) => {
                // var errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                showMessage({
                    message: errorMessage,
                    type: "danger",
                    duration: 4000
                });
                console.log('Error Register : ', errorMessage);
                // ..
            });


    }



    return (
        <>
            <ScrollView flex={1} backgroundColor={Colors.Primary}>
                <Header title={"Register"} onPress={() => navigation.goBack(null)} />
                <View style={styles.page}>
                    <Input title={"Name"} value={form.fullName} onChangeText={(value) => setForm('fullName', value)} />
                    <Gap height={ms(24)} />
                    <Input title={"Profession"} value={form.profession} onChangeText={(value) => setForm('profession', value)} />
                    <Gap height={ms(24)} />
                    <Input title={"Email"} value={form.email} onChangeText={(value) => setForm('email', value)} />
                    <Gap height={ms(24)} />
                    <Input title={"Password"} secure={true} value={form.password} onChangeText={(value) => setForm('password', value)} />
                    <Gap height={ms(40)} />
                    <Button title={'Continue'} type={"Primary"} onPress={onContinue} />
                    {/* {next && <Text style={{ color: 'white' }}> Hello {form.fullName}</Text>} */}
                </View>
            </ScrollView>
            {loading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Colors.Primary,
        padding: ms(40),
        flex: 1
    },
})