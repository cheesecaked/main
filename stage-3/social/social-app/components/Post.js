import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Drop } from "./Dropdown";

export const Card = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleDropDown = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.profile}>
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            paddingBottom: 25
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              marginRight: 20,
            }}
            source={require("../assets/PogChamp.png")}
          />
          <View
            style={{
              width: "70%",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              John Smith
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "grey",
              }}
            >
              6 minutes ago
            </Text>
          </View>
        </View>
        <View style={styles.dropdown}>
          { isClicked && <Drop index={props.index} toggleDropDown={toggleDropDown}/>}
          <TouchableOpacity onPress={toggleDropDown} >
          <Entypo name="dots-three-vertical" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          paddingTop: 10,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    justifyContent: "space-between",
    height: 160,
    width: "100%",
    padding: 20,
  },
  profile: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  dropdown: {
    flexDirection: "row",
    height: "100%",
    marginTop: "5%"
  }
});
