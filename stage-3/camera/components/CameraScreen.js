import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import PicButton from "../component/takePicButton";
import ImageItem from "./MediaScreen";

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState();
  const [selectedImages, setSelectedImages] = useState();
  const [ratioExpanded, setRatioExpanded] = useState(false);

  const ratioWidth = useRef(new Animated.Value(100)).current;
  const cameraRef = useRef();

  // async function loadStoragePhotos () {
  //   let media = await  MediaLibrary.getAssetsAsync
  // }
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Permission"></Button>
      </View>
    );
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const takePic = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const saveImage = async () => {
    if (image) {
      try {
        MediaLibrary.requestPermissionsAsync();
        await MediaLibrary.createAssetAsync(image);
        alert("pic saved");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function expandWidth() {
    setRatioExpanded(true);
    Animated.timing(ratioWidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function shrinkWidth() {
    setRatioExpanded(false);
    Animated.timing(ratioWidth, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
        paddingBottom: 20,
      }}
    >
      {!image ? (
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => (ratioExpanded ? shrinkWidth() : expandWidth())}
            >
              <Animated.View
                style={{
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.4)",
                  width: ratioWidth,
                  padding: 20,
                  margin: 20,
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>4:3</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image source={image.uri} />
      )}
      <View>
        {image ? (
          <View>
            <Image source={image.uri} />
            <PicButton
              title={"retake?"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <PicButton title={"save?"} icon={"check"} onPress={saveImage} />
          </View>
        ) : (
          <>
            <PicButton icon="circle" onPress={takePic} />
          </>
        )}
      </View>
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
});
