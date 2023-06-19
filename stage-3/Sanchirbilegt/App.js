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
          source={require("./assets/download.jpeg")}
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
    gap: "30px",
    borderWidth: 1,
  },
  image: {
    width: "50px",
    height: "50px",
  },
  input1: {
    borderWidth: 1,
    height: "32px",
  },
  pogchamp: {
    alignItems: "center",
    justifyContent: "center",
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {},
});
