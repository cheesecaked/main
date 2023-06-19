import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";

export const Task = (props) => {
    return (
        <View>
            <Text>{props.text}</Text>
        </View>
    )
}