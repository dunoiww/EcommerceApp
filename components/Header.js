import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React from "react";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.searchBar}>
                <AntDesign name="search1" size={22} color="black" />
                <TextInput
                    placeholder="Search something"
                    value={props.searchText}
                    onChangeText={(text) => props.setSearchText(text)}
                />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
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

});
