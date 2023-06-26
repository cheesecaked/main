import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "./Post";
import { Popup } from "./Popup";
import { DataProvider } from "../context/Provider";
import { DataContext } from "../context/Provider";

export default function Bruh() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const {posts,setPosts}=useContext(DataContext)

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const createPost = () => {
    axios
      .post("http://localhost:3001/posts/create", {
        text: input,
      })
      .then(async (res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {posts && posts.map((item, index) => {
          return <Card index={index} key={index} text={item.text}/>;
        })}
        {isOpen && (
          <Popup
            input={input}
            setInput={setInput}
            handleClose={togglePopup}
            createPost={createPost}
          />
        )}
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.addPost}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "25%",
          }}
          onPress={() => {togglePopup(), console.log(taskItems)}}
        >
          <AntDesign name="plus" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#E5E4E2",
  },
  addPost: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    paddingRight: 20,
  },
});
