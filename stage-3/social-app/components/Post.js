import { StyleSheet, View, Text, Image } from "react-native";
import { Entypo } from '@expo/vector-icons'; 

export const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.profile}>
      <View style={{
            width: "50%",
            flexDirection: "row"
        }}>
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
        <View style={{
            width: "70%",
            justifyContent: "center",
            gap: 10
        }}>
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
              color: "grey"
            }}
          >
            6 minutes ago
          </Text>
          
          </View>
        </View>
        <Entypo name="dots-three-vertical" size={24} color="grey" />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          paddingTop: 10,
        }}
      >
        Good Morning!
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {     
    backgroundColor: "#fff",
    marginBottom: 10,
    justifyContent: "space-between",
    padding: 20,
  },
  profile: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

});
