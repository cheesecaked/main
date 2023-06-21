import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

export const Popup = (props) => {
  return (
    <View style={styles.popupContainer}>
      <View style={styles.box}>
        <TouchableOpacity
          onPress={props.handleClose}
          style={{
            position: "fixed",
            border: "1px solid #999",
            backgroundColor: "#fff",
            height: 25,
            width: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            right: "24.2%",
            top: 15,
          }}
        >
          <Text>x</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <TextInput
          value={props.input}
          onChangeText={(input) => props.setInput(input)}
            style={{
              height: "100% ",
              border: "1px solid #999",
              outline: "none",
              padding: 5
            }}
          />
          <Button title="submit" onPress={() => props.handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  popupContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
  },
  box: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    minHeight: 100,
    backgroundColor: "white",
    border: "1px solid #999",
    borderRadius: 4,
    marginTop: 20,
    margin: "auto",
    padding: 20,
    overflow: "auto",
  },
});
