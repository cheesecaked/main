import { Image, StyleSheet, Text, TextInput, View, Button } from "react-native";

export const Task = (props) => {
    return (
        <View style={styles.task}>
            <Text>{props.text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    task : {
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid"
    }
})