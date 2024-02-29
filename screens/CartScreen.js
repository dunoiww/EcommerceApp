import {
    StyleSheet,
    Text,
    ScrollView,
    Pressable,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = React.useState("");
    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        .map((item) => item.price * item.quantity)
        .reduce((cur, prev) => cur + prev, 0);

    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    };

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
    }

    const removeItem = (item) => {
        dispatch(removeFromCart(item))
    }
    return (
        <ScrollView
            style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
            <Header searchText={searchText} setSearchText={setSearchText} />

            <View
                style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    Subtotal :{" "}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    ${total}
                </Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

            <Pressable onPress={() => navigation.navigate('Confirm')}
                style={{
                    marginHorizontal: 10,
                    backgroundColor: "#ffc72c",
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                }}>
                <Text>Proceed to buy ({cart.length}) item</Text>
            </Pressable>

            <Text
                style={{
                    borderColor: "#d0d0d0",
                    borderWidth: 1,
                    marginTop: 16,
                    height: 1,
                }}
            />

            <View style={{ marginHorizontal: 10 }}>
                {cart?.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            backgroundColor: "white",
                            marginVertical: 10,
                            borderRadius: 5,
                            shadowOpacity: 0.2,
                            shadowColor: "#000",
                            shadowOffset: {
                                height: 4,
                                width: 3,
                            },
                            shadowRadius: 6,
                        }}>
                        <Pressable
                            style={{
                                marginVertical: 10,
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}>
                            <View>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        resizeMode: "contain",
                                    }}></Image>
                            </View>

                            <View>
                                <Text
                                    numberOfLines={2}
                                    style={{ width: 150, marginTop: 10 }}>
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginTop: 5,
                                    }}>
                                    ${item.price}
                                </Text>
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        resizeMode: "contain",
                                    }}
                                    source={{
                                        uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                                    }}
                                />
                                <Text style={{ color: "green" }}>In Stock</Text>
                                {/* <Text
                                    style={{ fontWeight: "500", marginTop: 6 }}>
                                    {item?.rating?.rate} ratings
                                </Text> */}
                            </View>
                        </Pressable>

                        <Pressable
                            style={{
                                marginTop: 15,
                                marginBottom: 10,
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 7,
                                }}>
                                {item?.quantity > 1 ? (
                                    <Pressable onPress={() => decreaseQuantity(item)}
                                        style={{
                                            backgroundColor: "#d8d8d8",
                                            borderTopLeftRadius: 6,
                                            borderBottomLeftRadius: 6,
                                            padding: 7,
                                        }}>
                                        <Feather
                                            name="minus"
                                            size={24}
                                            color="black"
                                        />
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => removeItem(item)}
                                        style={{
                                            backgroundColor: "#d8d8d8",
                                            borderTopLeftRadius: 6,
                                            borderBottomLeftRadius: 6,
                                            padding: 7,
                                        }}>
                                        <AntDesign
                                            name="delete"
                                            size={24}
                                            color="black"
                                        />
                                    </Pressable>
                                )}

                                <Pressable
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 18,
                                        paddingVertical: 6,
                                    }}>
                                    <Text>{item?.quantity}</Text>
                                </Pressable>

                                <TouchableOpacity
                                    onPress={() => increaseQuantity(item)}
                                    style={{
                                        backgroundColor: "#d8d8d8",
                                        borderTopRightRadius: 6,
                                        borderBottomRightRadius: 6,
                                        padding: 7,
                                    }}>
                                    <Feather
                                        name="plus"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Pressable onPress={() => removeItem(item)}
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#c0c0c0",
                                    borderWidth: 0.6,
                                }}>
                                <Text>Delete</Text>
                            </Pressable>
                        </Pressable>

                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 10,
                                marginHorizontal: 10,
                                gap: 10,
                            }}>
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#c0c0c0",
                                    borderWidth: 0.6,
                                }}>
                                <Text>Save for later</Text>
                            </Pressable>

                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#c0c0c0",
                                    borderWidth: 0.6,
                                }}>
                                <Text>See more like this</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({});
