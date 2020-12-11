import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import GetLocation from 'react-native-get-location';
import { Text } from "react-native";

type region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

const App = () => {
  const [region, setRegion] = useState<region | null>(null);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setRegion({
          latitude: location.latitude, longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })

  }, [])

  if (region) {
    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
        {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
      </MapView>
    );
  }
  else {
    return (
      <Text>Loading...</Text>
    )
  }

};

export default App;