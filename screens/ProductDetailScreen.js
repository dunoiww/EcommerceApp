import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions,
    Image,
    LogBox,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import Header from "../components/Header";

const { width } = Dimensions.get("window");
const height = (width * 100) / 100;

const ProductDetailScreen = () => {
    const route = useRoute();
    const [searchText, setSearchText] = React.useState("");
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
        <ScrollView style={styles.container}>
            <Header searchText={searchText} setSearchText={setSearchText}/>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground
                        style={styles.imgBackground}
                        source={{ uri: item }}
                        key={index}>
                        <View style={styles.saleContainer}>
                            <View style={styles.saleSubContainer}>
                                <Text style={styles.saleText}>20% off</Text>
                            </View>

                            <View
                                style={[
                                    styles.saleSubContainer,
                                    styles.saleShare,
                                ]}>
                                <MaterialCommunityIcons
                                    name="share-variant"
                                    size={24}
                                    color="black"
                                />
                            </View>
                        </View>
                        <View
                            style={[
                                styles.saleSubContainer,
                                styles.saleShare,
                                styles.saleHeart,
                            ]}>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>

            <View style={styles.titleContainer}>
                <Text style={styles.titleContent}>{route.params?.title}</Text>

                <Text style={styles.price}>${route.params?.price}</Text>
            </View>

            <View style={styles.seperated} />

            <View style={styles.colorContainer}>
                <Text>Color: </Text>
                <Text style={styles.colorText}>{route?.params?.color}</Text>
            </View>

            <View style={styles.colorContainer}>
                <Text>Size: </Text>
                <Text style={styles.colorText}>{route?.params?.size}</Text>
            </View>

            <View style={styles.seperated} />

            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        marginVertical: 5,
                    }}>
                    Total: {route?.params?.price}
                </Text>
                <Text style={{ color: "#00ced1" }}>FREE delivery</Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginVertical: 5,
                    }}>
                    <Ionicons name="location" size={24} color="black" />
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        Delivery to Binh Phuoc - Viet Nam
                    </Text>
                </View>
                <Text style={{ color: "green", paddingHorizontal: 10 }}>
                    IN STOCK
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-around",
                    }}>
                    <Pressable
                        onPress={() => addItemToCart(route?.params?.item)}
                        style={{
                            borderRadius: 10,
                            backgroundColor: "orange",
                            width: 170,
                            alignItems: "center",
                            paddingVertical: 12,
                        }}>

                        {addedToCart ? (
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: "500" }}>Added to cart</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: "500" }}>Add to cart</Text>
                            </View>
                        )}
                    </Pressable>

                    <Pressable
                        style={{
                            borderRadius: 10,
                            backgroundColor: "green",
                            width: 170,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                            Buy Now
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 55,
        flex: 1,
        backgroundColor: "white",
    },

    header: {
        backgroundColor: "#00ced1",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    searchBar: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginHorizontal: 5,
        height: 38,
        padding: 8,
        borderRadius: 3,
        backgroundColor: "white",
        flex: 1,
    },

    imgBackground: {
        width: width,
        height: height,
        marginTop: 25,
        resizeMode: "contain",
    },

    saleContainer: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },

    saleSubContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c60c30",
        flexDirection: "row",
    },

    saleShare: {
        backgroundColor: "#e0e0e0",
    },

    saleText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12,
    },

    saleHeart: {
        marginTop: "auto",
        marginLeft: 20,
        marginBottom: 20,
    },

    titleContainer: {
        padding: 10,
    },

    titleContent: {
        fontSize: 15,
        fontWeight: "600",
    },

    price: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 6,
    },

    seperated: {
        height: 1,
        borderColor: "#d0d0d0",
        borderWidth: 1,
    },

    colorContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },

    colorText: {
        fontWeight: "bold",
        fontSize: 15,
    },
});
