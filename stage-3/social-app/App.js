import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "./components/Post";
import { Popup } from "./components/Popup";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // const [input, setInput] = useState("");
  // const [taskItems, setTaskItems] = useState([]);

  // const handleSubmit = () => {
  //   setTaskItems([...taskItems, input]);
  //   setInput("");
  // };

  // const Delete = (index) => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy)
  // }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card />
        {isOpen && <Popup handleClose={togglePopup} />}
        <StatusBar style="auto" />
        <TouchableOpacity onPress={togglePopup} style={styles.addPost}>
          <AntDesign name="plus" size={40} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E4E2",
  },
  addPost: {
    width: 60,
    height: 60,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: "80%",
    marginLeft: "90%",
    borderRadius: "25%",
  },
});
