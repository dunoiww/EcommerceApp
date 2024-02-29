import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('authToken')
        .then((token) => {
            if (token) {
                navigation.replace('HomeTab');
            }
        })
        .catch((err) => console.log(err))
    }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        }

        axios.post("http://localhost:8000/login", user)
        .then((res) => {
            console.log(res);
            const token = res.data.token;
            AsyncStorage.setItem('authToken', token);
            navigation.replace('HomeTab');
        })
        .catch((err) => {
            Alert.alert("Login failed", "Invalid email or password")
            console.log(err);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={styles.img}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                ></Image>
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.loginText}>
                        Login In to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 80 }}>
                    <View style={styles.loginForm}>
                        <MaterialIcons name="email" size={24} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="Input your Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                    </View>

                    <View style={styles.loginForm}>
                        <Entypo name="lock" size={24} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="Input your Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        ></TextInput>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 12,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Keep me Login</Text>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 70 }}>
                    <Pressable style={styles.btnLogin} onPress={handleLogin}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            Login
                        </Text>
                    </Pressable>
                </View>

                <Pressable style={{marginTop: 10}} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signIn}>Don't have an Account? <Text style={{color: '#041E42'}}>Register</Text></Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 50
    },

    img: {
        height: 100,
        width: 150,
    },

    loginText: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 12,
        color: "#041E42",
    },

    loginForm: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#d0d0d0",
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginTop: 20,
    },

    input: {
        width: 300,
        color: "gray",
        marginVertical: 10,
        fontSize: 15,
    },

    forgotText: {
        color: "#041E42",
        fontWeight: "bold",
    },

    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#febe10",
        width: 200,
        borderRadius: 6,
        padding: 15,
        alignSelf: "center",
    },

    signIn: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 15
    }
});
