import { configureAbly, useChannel } from '@ably-labs/react-hooks';
import React, { createRef, useRef } from 'react';
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Button } from 'react-native';


configureAbly({ key: 'EE7t7w.Me0VSg:gNCuO99scvaQgmhmbf7GCAqSKmHUwaMMcVVggFnREX4', clientId: Date.now() + '' })

export default function App() {
  const [location, setLocation] = React.useState(null)

  const mapRef = useRef()

  const [channel] = useChannel('gps-tracking', (message) => {
    console.log({ message })
  })
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        alert('permission not granted')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)

      Location.watchPositionAsync({}, (location) => {
        setLocation(location);
        mapRef.current.animateToRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 }, 500)
        channel.publish('message', location)
      })
    })()
  }, [])
  return (
    <View style={styles.container}>
      <MapView showsTraffic ref={mapRef} style={styles.map}>
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
      <View style={{
          position: 'absolute', bottom: 20, right: 20, backgroundColor: 'white',
        }}>
          <Button
            title='center'
            onPress={() => {
              mapRef.current.animateToRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 }, 500)
            }}>
            center
          </Button>
        </View>

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