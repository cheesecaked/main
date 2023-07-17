import React from 'react';
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [location, setLocation] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        alert('permission not granted')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {
          location && (
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
              <View style={{
                width: 50, height: 50, borderRadius: 50, backgroundColor: "#C5C5C5", justifyContent: "center", alignItems: "center", borderWidth: 5, borderColor: "#545454  "
              }}>
                <Text style={{
                  fontSize: 10
                }}>
                  You
                </Text>
              </View>
            </Marker>
          )
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});