import React, { createContext, useState, useEffect, useContext, ReactNode, useRef } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Battery from 'expo-battery';
import { sendPushNotification, registerForPushNotificationsAsync } from './notification';
import { DateTimeInfo } from '@/constants/constants';

// TODO: define to within radius miles of home location
const SAFETY_ZONE = {
  latitude: 34.0522,
  longitude: -118.2437,
  radius: 1000,
};

type LocationContextType = {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  isInSafeZone: boolean;
  batteryLevel: number;
  getDateTime: () => DateTimeInfo;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  errorMsg: null,
  isInSafeZone: true,
  batteryLevel: 100,
  getDateTime: () => ({ time: '', date: '', month: '' }),
});

export const useLocation = () => useContext(LocationContext);

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInSafeZone, setIsInSafeZone] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const dateTimeRef = useRef(new Date());

  useEffect(() => {
    (async () => {
      // Request necessary permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get initial location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      checkSafeZone(location.coords);

      // Set up location tracking
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          checkSafeZone(newLocation.coords);
        }
      );

      // set up battery monitoring
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel * 100);
        if (batteryLevel <= 0.05) {
          sendLowBatteryNotification();
        }
      });

      // Get initial battery level
      const batteryLevel = await Battery.getBatteryLevelAsync();
      setBatteryLevel(batteryLevel * 100);

      // Get Expo push token
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    })();
  }, []);

  const getDateTime = (): DateTimeInfo => {
    const currentDateTime = dateTimeRef.current;
    return {
      time: currentDateTime.toLocaleTimeString(),
      date: currentDateTime.toLocaleDateString(),
      month: currentDateTime.toLocaleString('default', { month: 'long' }),
    };
  };

  const checkSafeZone = (coords: Location.LocationObjectCoords) => {
    const distance = getDistanceFromLatLonInMeters(
      coords.latitude,
      coords.longitude,
      SAFETY_ZONE.latitude,
      SAFETY_ZONE.longitude
    );

    const newIsInSafeZone = distance <= SAFETY_ZONE.radius;
    if (isInSafeZone && !newIsInSafeZone) {
      sendSafeZoneExitNotification();
    }
    setIsInSafeZone(newIsInSafeZone);
  };

  const sendSafeZoneExitNotification = async () => {
    if (expoPushToken) {
      await sendPushNotification(
        expoPushToken,
        'Safety Alert',
        'You have left the designated safe zone.'
      );
    }
  };

  const sendLowBatteryNotification = async () => {
    if (expoPushToken) {
      await sendPushNotification(
        expoPushToken,
        'Low Battery Alert',
        'Your battery level is at 5%. Please charge your device soon.'
      );
    }
  };

  return (
    <LocationContext.Provider value={{ location, errorMsg, isInSafeZone, batteryLevel, getDateTime }}>
      {children}
    </LocationContext.Provider>
  );
};

// Helper function to calculate distance between two points
function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
