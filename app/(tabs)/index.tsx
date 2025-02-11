import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, Linking, Modal, ScrollView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, PROVIDER_DEFAULT, Polygon, Callout } from 'react-native-maps';
import axios from 'axios';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '@/components/styles';
import { useLocation } from '../location';
import { RouteType, Zone, CrimeMarker, transportationModes, centralLA } from '@/constants/constants';
import { GOOGLE_MAPS_APIKEY } from '@/constants/key';
import { mockCrimeIncidents, mockCrimeIncidentsAlternate, mockDangerZones, getMockDangerZones } from '@/constants/data';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('WALKING');
  const [showRouteOptions, setShowRouteOptions] = useState(false);
  const [userProfile, setUserProfile] = useState({ gender: 'female' });
  const [route, setRoute] = useState<RouteType | null>(null);
  const [dangerZones, setDangerZones] = useState<Zone[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportMedia, setReportMedia] = useState([]);
  const mapRef = useRef<MapView>(null as any);
  const { location } = useLocation();

  const fetchData = useCallback(() => {
    setDangerZones(getMockDangerZones(userProfile.gender));
  }, [userProfile.gender]);

  useEffect(() => {
    fetchUserProfile();

    if (isMapReady) {
      fetchData();
    }
  }, [isMapReady, fetchData]);

  useEffect(() => {
    if (location && isMapReady) {
      mapRef.current?.animateToRegion({
        latitude: centralLA.latitude,
        longitude: centralLA.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location, isMapReady]);

  const fetchUserProfile = async () => {
    try {
      const profileJson = await AsyncStorage.getItem('userProfile');
      if (profileJson) {
        setUserProfile(JSON.parse(profileJson));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const centerMapOnUser = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: centralLA.latitude,  // location.coords.latitude,
        longitude: centralLA.longitude,  // location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const getZoneColor = (dangerLevel: 'low' | 'medium' | 'high') => {
    switch (dangerLevel) {
      case 'low':
        return {
          fillColor: 'rgba(0, 100, 0, 0.5)',
          strokeColor: 'rgb(0, 100, 0)'
        };
      case 'medium':
        return {
          fillColor: 'rgba(255, 200, 0, 0.6)',
          strokeColor: 'rgb(255, 200, 0)'
        };
      case 'high':
        return {
          fillColor: 'rgba(255, 0, 0, 0.5)',
          strokeColor: 'rgb(255, 0, 0)'
        };
      default:
        return {
          fillColor: 'rgba(255, 0, 0, 0.5)',
          strokeColor: 'rgb(255, 0, 0)'
        };
    }
  };

  const Legend = () => (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>Danger Levels</Text>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 100, 0, 0.5)' }]} />
        <Text style={styles.legendText}>Low (0-33%)</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 200, 0, 0.6)' }]} />
        <Text style={styles.legendText}>Medium (34-66%)</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 0, 0, 0.5)' }]} />
        <Text style={styles.legendText}>High (67-100%)</Text>
      </View>
    </View>
  );
  

  const renderMarkers = () => {
    const crimeIncidents = userProfile.gender === 'female' ? mockCrimeIncidents : mockCrimeIncidentsAlternate;
    return crimeIncidents.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      >
        <View style={styles.customMarker}>
          <IconSymbol name="exclamationmark.triangle.fill" size={24} color="red" />
        </View>
      </Marker>
    ));
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportType('');
    setReportDescription('');
    setReportMedia([]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReportMedia([...reportMedia, result.assets[0].uri]);
    }
  };

  const submitReport = () => {
    // TODO: send the report to your backend
    console.log('Report submitted:', {
      type: reportType,
      description: reportDescription,
      media: reportMedia,
      date: new Date().toISOString(),
      location: location ? { latitude: location.coords.latitude, longitude: location.coords.longitude } : null,
    });
    closeReportModal();
  };

  const generateRoute = async () => {
    if (!origin || !destination) {
      alert('Please enter both origin and destination');
      return;
    }

    try {
      // TODO: remove region bias
      const regionBias = '&region=us&components=administrative_area:CA|locality:Los Angeles';

      // geocode the origin and destination
      const [originGeocode, destinationGeocode] = await Promise.all([
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=\\${encodeURIComponent(origin)}\\${regionBias}&key=\\${GOOGLE_MAPS_APIKEY}`
        ),
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=\\${encodeURIComponent(destination)}\\${regionBias}&key=\\${GOOGLE_MAPS_APIKEY}`
        )
      ]);

      console.log('Origin Geocode Response:', originGeocode.data);
      console.log('Destination Geocode Response:', destinationGeocode.data);

      if (originGeocode.data.results.length === 0 || destinationGeocode.data.results.length === 0) {
        alert('Could not find one or both of the locations. Please try to be more specific.');
        return;
      }

      const originCoords = originGeocode.data.results[0].geometry.location;
      const destinationCoords = destinationGeocode.data.results[0].geometry.location;

      // get directions
      const directionsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=\\${originCoords.lat},\\${originCoords.lng}&destination=\\${destinationCoords.lat},\\${destinationCoords.lng}&mode=\\${travelMode.toLowerCase()}&key=\\${GOOGLE_MAPS_APIKEY}`
      );

      console.log('Directions Response:', directionsResponse.data);

      if (directionsResponse.data.status === 'OK') {
        const route = directionsResponse.data.routes[0];
        const points = decodePolyline(route.overview_polyline.points);

        setRoute({
          origin: {
            latitude: originCoords.lat,
            longitude: originCoords.lng
          },
          destination: {
            latitude: destinationCoords.lat,
            longitude: destinationCoords.lng
          },
          coordinates: points
        });

        // fit map to route
        mapRef.current?.fitToCoordinates(points, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true
        });
      } else {
        alert(`Could not find a route: \\${directionsResponse.data.status}`);
      }
    } catch (error) {
      console.error('Error generating route:', error);
      alert('An error occurred while generating the route');
    }
  };

  function decodePolyline(encoded: string) {
    const poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return poly;
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.toggleBar} onPress={() => setShowRouteOptions(!showRouteOptions)}>
        <IconSymbol name={showRouteOptions ? 'chevron.down' : 'chevron.right'} size={28} color='black' />
        <Text style={styles.toggleBarText}>Find the safest route</Text>
      </TouchableOpacity>
      {showRouteOptions && (
        <View style={styles.routeOptionsContainer}>
          <TextInput
            style={styles.routeInput}
            placeholder="Origin"
            value={origin}
            onChangeText={setOrigin}
          />
          <TextInput
            style={styles.routeInput}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />
          <View style={styles.modeContainer}>
            {['DRIVING', 'WALKING', 'TRANSIT', 'BICYCLING'].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.modeButton,
                  travelMode === mode && styles.selectedMode
                ]}
                onPress={() => setTravelMode(mode)}
              >
                <IconSymbol name={transportationModes[mode]} size={28} color={travelMode === mode ? '#007AFF' : "black"} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={generateRoute}>
            <Text style={styles.buttonText}>Generate Route</Text>
          </TouchableOpacity>
        </View>
      )} */}

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords?.latitude || centralLA.latitude,
          longitude: location?.coords?.longitude || centralLA.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        onMapReady={() => setIsMapReady(true)}
      >
        {isMapReady && (
          <>
            {route && (
              <>
                <Polyline
                  coordinates={route.coordinates || []}
                  strokeColor="#000"
                  strokeWidth={4}
                />
                <Marker coordinate={route.origin} title="Origin" />
                <Marker coordinate={route.destination} title="Destination" />
              </>
            )}

            {dangerZones.map((zone) => (
              <Polygon
                key={zone.id}
                coordinates={zone.coordinates}
                strokeColor={getZoneColor(zone.dangerLevel).strokeColor}
                strokeWidth={1}
                fillColor={getZoneColor(zone.dangerLevel).fillColor}
                pointerEvents="none"
              />
            ))}

            {renderMarkers()}
          </>
        )}
      </MapView>

      <Legend />

      <TouchableOpacity style={styles.reportButton} onPress={openReportModal}>
        <IconSymbol name="flag.fill" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUser}>
        <IconSymbol name="location" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showReportModal}
        onRequestClose={closeReportModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report an Event</Text>

            <Text style={styles.inputLabel}>Event Type</Text>
            <Picker
              selectedValue={reportType}
              onValueChange={(itemValue) => setReportType(itemValue)}
            >
              <Picker.Item label="Select event type" value="" />
              <Picker.Item label="Fight" value="fight" />
              <Picker.Item label="Accident" value="accident" />
              <Picker.Item label="Burglary" value="burglary" />
              <Picker.Item label="Suspicious Activity" value="suspicious" />
              <Picker.Item label="Other" value="other" />
            </Picker>

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={6}
              value={reportDescription}
              onChangeText={setReportDescription}
              placeholder="Provide a detailed description of the event"
            />

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Add Image/Video</Text>
            </TouchableOpacity>

            {reportMedia.map((media, index) => (
              <Image key={index} source={{ uri: media }} style={styles.mediaPreview} />
            ))}

            <TouchableOpacity style={styles.button} onPress={submitReport}>
              <Text style={styles.buttonText}>Submit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={closeReportModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
