import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
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
      first: 25,
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
