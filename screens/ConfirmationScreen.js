import { StyleSheet, Text, ScrollView, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartReducer";

const ConfirmationScreen = () => {
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];

    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        .map((item) => item.price * item.quantity)
        .reduce((cur, prev) => cur + prev, 0);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [option, setOption] = useState(false);
    const [method, setMethod] = useState("cash");
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
            setSelectedAddress(addresses[0]);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: method,
            }

            const res = await axios.post('http://localhost:8000/orders', orderData);

            if (res.status === 200) {
                navigation.navigate('Order')
                dispatch(cleanCart()); 
                Alert.alert('Success', 'Order placed successfully');
            }
        } catch (err) {
            console.log(err); 
        }
    }

    const pay = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        justifyContent: "space-between",
                    }}>
                    {steps?.map((step, index) => (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {index > 0 && (
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            height: 2,
                                            backgroundColor: "green",
                                        },
                                        index <= currentStep && {
                                            backgroundColor: "green",
                                        },
                                    ]}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: "#ccc",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    index < currentStep && {
                                        backgroundColor: "green",
                                    },
                                ]}>
                                {index < currentStep ? (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}>
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}>
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text style={{ textAlign: "center", marginTop: 8 }}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Select Delivery Address
                    </Text>

                    <Pressable>
                        {addresses.map((item, index) => (
                            <Pressable
                                key={index}
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#d0d0d0",
                                    padding: 10,
                                    gap: 5,
                                    flexDirection: "row",
                                    marginTop: 10,
                                    alignItems: "center",
                                    borderRadius: 5,
                                }}>
                                {selectedAddress &&
                                selectedAddress._id === item._id ? (
                                    <FontAwesome
                                        name="circle"
                                        size={28}
                                        color="#008397"
                                    />
                                ) : (
                                    <Entypo
                                        onPress={() => setSelectedAddress(item)}
                                        name="circle"
                                        size={24}
                                        color="gray"
                                    />
                                )}

                                <View style={{ marginLeft: 5 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 3,
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "bold",
                                            }}>
                                            {item?.name}
                                        </Text>
                                        <Entypo
                                            name="location-pin"
                                            size={24}
                                            color="red"
                                        />
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        {item?.houseNo}, {item?.landmark}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        {item?.street}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        India, Bangalore
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        phone No : {item?.mobileNo}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "#181818",
                                        }}>
                                        pin code : {item?.postalCode}
                                    </Text>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 10,
                                            marginTop: 7,
                                        }}>
                                        <Pressable
                                            style={{
                                                backgroundColor: "#F5F5F5",
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderWidth: 0.9,
                                                borderColor: "#D0D0D0",
                                            }}>
                                            <Text>Edit</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{
                                                backgroundColor: "#F5F5F5",
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderWidth: 0.9,
                                                borderColor: "#D0D0D0",
                                            }}>
                                            <Text>Remove</Text>
                                        </Pressable>

                                        <Pressable
                                            style={{
                                                backgroundColor: "#F5F5F5",
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderWidth: 0.9,
                                                borderColor: "#D0D0D0",
                                            }}>
                                            <Text>Set as Default</Text>
                                        </Pressable>
                                    </View>
                                    <View>
                                        {selectedAddress &&
                                            selectedAddress._id ===
                                                item._id && (
                                                <Pressable
                                                    onPress={() =>
                                                        setCurrentStep(1)
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#008397",
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        alignItems: "center",
                                                        marginVertical: 10,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: "white",
                                                        }}>
                                                        Deliverty to this
                                                        address
                                                    </Text>
                                                </Pressable>
                                            )}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            )}

            {currentStep == 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Choose your delivery options
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 5,
                            marginTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {option ? (
                            <FontAwesome
                                name="circle"
                                size={28}
                                color="#008397"
                            />
                        ) : (
                            <Entypo
                                onPress={() => setOption(!option)}
                                name="circle"
                                size={24}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: "green", fontWeight: "500" }}>
                                Tomorrow by 10pm
                            </Text>{" "}
                            - FREE delivery with your Prime membership
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(2)}
                        style={{
                            backgroundColor: "#ffc72c",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}>
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}

            {currentStep == 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Select your Payment Method
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 5,
                            alignItems: "center",
                            marginTop: 10,
                        }}>
                        {method === "cash" ? (
                            <FontAwesome
                                name="circle"
                                size={28}
                                color="#008397"
                            />
                        ) : (
                            <Entypo
                                onPress={() => setMethod("cash")}
                                name="circle"
                                size={24}
                                color="gray"
                            />
                        )}

                        <Text>Cash on delivery</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 5,
                            alignItems: "center",
                            marginTop: 10,
                        }}>
                        {method === "credit" ? (
                            <FontAwesome
                                name="circle"
                                size={28}
                                color="#008397"
                            />
                        ) : (
                            <Entypo
                                onPress={() => {
                                    setMethod("credit")
                                    Alert.alert('Credit card', 'Pay online', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => pay(),
                                        }
                                    ])
                                }}
                                name="circle"
                                size={24}
                                color="gray"
                            />
                        )}

                        <Text>Credit card</Text>
                    </View>

                    <Pressable
                        onPress={() => setCurrentStep(3)}
                        style={{
                            backgroundColor: "#ffc72c",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}>
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}

            {currentStep == 3 && method === "cash" && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Order Now
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 5,
                            marginTop: 10,
                        }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                Save 5% and never run out
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "gray",
                                    marginTop: 5,
                                }}>
                                Turn on auto deliveries
                            </Text>
                        </View>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={24}
                            color="black"
                        />
                    </View>

                    <View style={{backgroundColor: 'white', padding: 8, marginTop: 10, borderRadius: 5}}>
                        <Text>Shipping to {selectedAddress.name}</Text>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>Items</Text>
                            <Text style={{fontSize: 16, color: 'gray'}}> ${total} </Text>
                        </View>
                         
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>Delivery</Text>
                            <Text style={{fontSize: 16, color: 'gray'}}> $0 </Text>
                        </View>
                         
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Order total</Text>
                            <Text style={{fontSize: 17, color: '#c60c30'}}> ${total} </Text>
                        </View>
                    </View>

                    <View style={{backgroundColor: 'white', padding: 8, marginTop: 10, borderRadius: 5}}>
                        <Text style={{fontSize: 16, color: 'gray'}}>
                            Pay with
                        </Text>

                        <Text style={{fontSize: 16, fontWeight: '600', marginTop: 7}}>Pay on delivery (cash)</Text>
                    </View>

                    <Pressable onPress={handlePlaceOrder} style={{backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <Text>Place your Order</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
