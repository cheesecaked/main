import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { DataContext } from "../context/Provider";
import { useContext, useEffect } from "react";
export const Drop = (props) => {
  const { posts, setPosts, deleteId, setDeleteId } = useContext(DataContext);
  const deletePost = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3001/posts/delete/${id._id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props.index);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          border: "1px solid",
          padding: 5,
        }}
        onPress={() => {
          props.toggleDropDown;
        }}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          border: "1px solid",
          padding: 5,
        }}
        onPress={() => {
          props.toggleDropDown, deletePost(posts[props.index]);
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
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
