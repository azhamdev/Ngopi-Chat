import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/colors'
import { ms } from 'react-native-size-matters'
import { ImagesList } from '../../helpers/images'
import Link from '../../components/Link'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Gap from '../../components/Gap'
import { useForm } from '../../helpers/useForm'
import Fire from '../../helpers/config/Fire'
import { showMessage } from 'react-native-flash-message'
import Loading from '../../components/Loading'
import { storeData } from '../../helpers/localStorage'

export default function Login({ navigation }) {
    const [form, setForm] = useForm(
        {
            email: '',
            password: ''
        }
    )
    const [loading, setLoading] = useState(false)

    const login = () => {
        console.log("form :", form);
        setLoading(true)
        Fire.auth().signInWithEmailAndPassword(form.email, form.password)
            .then(res => {
                console.log("Login Success ", res)
                setLoading(false)
                Fire.database()
                    .ref(`users/${res.user.uid}/`)
                    .once('value')
                    .then(resDB => {
                        console.log("data User", resDB.val());
                        if (resDB.val())
                        {
                            storeData('user', resDB.val());
                            navigation.navigate("MainApp")
                        }
                    })
            })
            .catch(err => {
                console.log("Error :", err);
                setLoading(false)
                switch (err.code)
                {
                    case 'auth/user-not-found':
                        showMessage({
                            message: "User not found, check again or register !",
                            type: 'danger',
                            duration: 4000
                        })
                        break;
                    case "auth/invalid-email":
                        showMessage({
                            message: "Invalid Email",
                            type: 'danger',
                            duration: 4000
                        })
                        break;
                    case "auth/wrong-password":
                        showMessage({
                            message: "Invalid Password",
                            type: 'danger',
                            duration: 4000
                        })
                        break;
                    default:
                        showMessage({
                            message: "Invalid Password/Email try again",
                            type: 'danger',
                            duration: 4000
                        })
                        break;
                }

            })
    }


    return (
        <>
            <ScrollView style={styles.page}>
                <View>
                    <ImagesList.Logo width={ms(86)} height={ms(86)} />
                    <Text style={styles.text}>
                        Masuk dan mulai {`\n`}
                        Ngobrol
                    </Text>
                </View>
                <Input title={"Email"}
                    secure={false}
                    value={form.email}
                    onChangeText={(value) => setForm('email', value)} />
                <Gap height={ms(24)} />
                <Input title={"Password"}
                    secure={true}
                    value={form.password}
                    onChangeText={(value) => setForm('password', value)}
                />
                <Gap height={ms(10)} />
                <Link title={'Forgot My Password'} size={ms(12)} />
                <Gap height={ms(40)} />
                <Button title={"Login"} type={'Primary'} onPress={login} />
                <Gap height={ms(30)} />
                <Link title={'Create New Account'} size={ms(16)} align={'center'} onPress={() => navigation.navigate('Register')} />
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
    text: {
        fontSize: ms(20),
        fontWeight: '600',
        marginVertical: ms(40),
        color: Colors.Text
    },

})