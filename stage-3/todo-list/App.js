import { Image, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from "react-native";
import { Task } from "./components/Task";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleSubmit = () => {
    setTaskItems([...taskItems, input]);
    setInput("");
  };

  const Delete = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }
  return (
    <View style={styles.container}>
      <View style={styles.pogchamp}>
        <Image
          style={styles.image}
          source={require("./assets/PogChamp.png")}
        />
        <Text>TO DO LISTT</Text>
      </View>
      <View style={styles.todo}>
        <TextInput
          style={styles.input1}
          value={input}
          onChangeText={(input) => setInput(input)}
        />
        <Button title="submit" onPress={() => handleSubmit()} />
      </View>
      <View style={styles.list}>
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => Delete()}>
              <Task key={index} text={item}/>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  image: {
    width: "5%",
    height: "5%",
  },
  input1: {
    borderWidth: 1,
    height: "32px",

  },
  pogchamp: {
    height: "33%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  todo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  list: {
    borderWidth: 1,
    height: "33%",
    width: "21.5%"
  },
});
