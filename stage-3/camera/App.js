import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createStackNavigator, NavigationContainer} from "@react-navigation/native"
import { Entypo } from "@expo/vector-icons";
import { CameraScreen } from "./components/CameraScreen";
import { MediaScreen } from "./components/MediaScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 32,
        justifyContent: "space-around",
        paddingVertical: 32,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Entypo name="camera" size={64} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Media")}>
        <Entypo name="images" size={64} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    paddingBottom: 20,
  },
});
