import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";


export const MediaScreen = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState();

  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 10,
    });
    setImages(media.assets);
  }

  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadInitialPhotos();
    }
  }, [permissionResponse]);

  if (!permissionResponse) {
    return <View />;
  }

  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          Permission has not been granted, Go to {"\n\n"} Settings {">"}{" "}
          Permissions {">"} Storage {"\n"}
        </Text>
      </View>
    );
  }

  function loadMoreImages() {
    // TODO
  }
  return (
    <FlatList
      onEndReached={loadMoreImages}
      numColumns={3}
      renderItem={({ item }) => <ImageItem photo={item} />}
      keyExtractor={(item) => item.uri}
    />
  );
};

export function ImageItem({ image }) {
  return <Image source={{ uri: image.uri }} />;
}


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
