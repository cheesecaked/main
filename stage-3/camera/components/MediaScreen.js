import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import mime from "mime";
import * as MediaLibrary from "expo-media-library";

const windowWidth = Dimensions.get("window").width;

const imageWidth = windowWidth * 0.33;
const imageGap = windowWidth * 0.005;

export const MediaScreen = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });
    setImages(media.assets);
  }
  async function loadMoreImages() {
    let media = await MediaLibrary.getAssetsAsync({
      after: images[images.length - 1].id,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });

    setImages([...images, ...media.assets]);
  }

  async function handleUpload() {
    const photo = selectedImages[0];

    const info = await MediaLibrary.getAssetInfoAsync(photo);

    console.log({ info });

    const data = new FormData();

    data.append('file', {
      uri: info.localUri,
      name: info.filename,
      type: mime.getType(info.localUri)
    })
    data.append("upload_preset", "cheesecake")
    // data.append("file", { uri: info.localUri, name: info.filename });
    // data.append("upload_preset", "cheesecake");
    // data.append("cloud_name", "dzsxbj2ug");

    console.log(data);

    fetch("https://api-ap.cloudinary.com/v1_1/dzsxbj2ug/upload", {
      method: "post",
      body: data,
    }).then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
      })
      .catch((err) => {
        alert("error while uploading");
        console.log(err);
      });
  }
  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadInitialPhotos();
    }
  }, [permissionResponse]);
  console.log({ selectedImages });
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
        <TouchableOpacity
          style={{ backgroundColor: "black", padding: 20, borderRadius: 10 }}
          onPress={requestPermission}
        >
          <Text>Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!granted && !canAskAgain) {
    return (
      <View>
        <Text>no permission dude</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        onEndReached={loadMoreImages}
        numColumns={3}
        data={images}
        renderItem={({ item, index }) => (
          <ImageItem
            index={index}
            image={item}
            onSelect={() => setSelectedImages([...selectedImages, item])}
            onRemove={() =>
              setSelectedImages(
                selectedImages.filter((selected) => {
                  selected !== item.id;
                })
              )
            }
            selected={
              selectedImages.findIndex((selected) => {
                selected.id === item.id;
              }) + 1
            }
          />
        )}
        keyExtractor={(item) => item.uri}
      />

      {selectedImages.length > 0 && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "black",
            padding: 20,
            borderRadius: 20,
            alignItems: "center",
          }}
          onPress={handleUpload}
        >
          <Text style={{ color: "white" }}>send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

function ImageItem({ image, index, onSelect, onRemove, selected }) {
  const marginHorizontal = index % 3 === 1 ? imageGap : 0;

  return (
    <TouchableOpacity
      onPress={() => {
        selected ? onRemove() : onSelect();
      }}
    >
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          marginBottom: imageGap,
          marginHorizontal,
          position: "relative",
        }}
      >
        <Image
          style={{
            width: imageWidth,
            height: imageWidth,
            backgroundColor: "#ccc",
          }}
          source={{ uri: image.uri }}
        />
        {!!selected && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{selected}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
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
