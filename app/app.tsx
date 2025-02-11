import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
// import { registerForPushNotificationsAsync } from './notification';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function Root() {
//   const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
//   const [notification, setNotification] = useState<Notifications.Notification | false>(false);
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token: SetStateAction<string | undefined>) => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}
