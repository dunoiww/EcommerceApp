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
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        }

        axios.post("http://localhost:8000/register", user)
        .then((res) => {
            console.log(res);
            Alert.alert (
                "Registration successful",
                "You have registered successfully"
            );
            setName("");
            setEmail("");
            setPassword("");
        })
        .catch((err) => {
            console.log(err);
            Alert.alert (
                "Registration failed",
                "An error occurred while registering"
            );
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
                        Register to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 80 }}>
                    <View style={styles.loginForm}>
                        <FontAwesome
                            name="user"
                            size={24}
                            color="gray"
                            style={{ marginRight: 8 }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Input your Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                    </View>

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

                <View style={{ marginTop: 70 }}>
                    <Pressable style={styles.btnLogin} onPress={handleRegister}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            Register
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.signIn}>
                        Already have an Account?{" "}
                        <Text style={{ color: "#041E42" }}>Sign In</Text>
                    </Text>
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
        textAlign: "center",
        color: "gray",
        fontSize: 15,
    },
});
