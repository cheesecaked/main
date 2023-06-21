import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const Popup = (props) => {
  return (
    <View style={styles.popupContainer}>
      <View style={styles.box}>
      <TouchableOpacity onPress={props.handleClose} style={{
            position: "fixed",
            border: "1px solid #999",
            backgroundColor: "#fff",
            height: 25,
            width: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            right: "24.2%",
            top: 15
        }}>
            <Text>x</Text>
        </TouchableOpacity>
        <Text>popup</Text>
        
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
    zIndex: "999"
  },
  box: {
    position: "relative",
    flexDirection: "row",
    width: "50%",
    minHeight: 300,
    backgroundColor: "white",
    border: "1px solid #999",
    borderRadius: 4,
    marginTop: 20,
    margin: "auto",
    padding: 20,
    overflow: "auto"
  }
});
