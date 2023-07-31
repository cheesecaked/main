module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    expo: {
      plugins: [
        [
          "expo-camera",
          {
            cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
          },
          "expo-media-library",
          {
            photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
            savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
            isAccessMediaLocationEnabled: true,
          },
        ],
      ],
    },
  };
};
