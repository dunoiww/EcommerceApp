import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = (props) => {
    const [addedToCart, setAddedToCart] = React.useState(false);
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
    };
    const cart = useSelector((state) => state.cart.cart);
    return (
        <Pressable style={styles.container}>
            <Image
                style={{ width: 140, height: 140, resizeMode: "contain" }}
                source={{ uri: props.item.image }}
            />

            <Text
                numberOfLines={1}
                style={{ width: 140, marginTop: 10, textAlign: "center" }}>
                {props.item?.title}
            </Text>

            <View style={styles.infoItemContainer}>
                <Text style={styles.itemPrice}>{props.item?.price}$</Text>
                <Text>
                    {props.item?.rating?.rate}{" "}
                    <AntDesign name="star" size={20} color="#ffc72c" />{" "}
                </Text>
            </View>

            <Pressable
                style={styles.btnCart}
                onPress={() => addItemToCart(props.item)}>
                {addedToCart ? (
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                            Added to cart
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                            Add to cart
                        </Text>
                    </View>
                )}
            </Pressable>
        </Pressable>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 25,
        padding: 5,
    },

    infoItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        alignItems: "center",
    },

    itemPrice: {
        fontWeight: "bold",
        fontSize: 15,
    },

    btnCart: {
        backgroundColor: "#ffc72c",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginHorizontal: 10,
    },
});
