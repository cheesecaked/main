import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const Drop = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{
        border: "1px solid",
        padding: 5
      }} onPress={() => {
        props.toggleDropDown
      }}>Edit</Text>
      <Text style={{
        border: "1px solid",
        padding: 5
      }} onPress={() => {
        props.toggleDropDown,
        props.delete()
      }}>Delete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    border: "1px solid #999",
    height: "fit-content",
    width: 100,
  },
});
