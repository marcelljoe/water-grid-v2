import 'firebase/compat/messaging';
import firebase from 'firebase/compat/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    try {
      // Check if Firebase app is already initialized
      if (!firebase.apps.length) {
        // Initialize the Firebase app with the provided credentials
        firebase.initializeApp({
          apiKey: 'AIzaSyAKzoxx2Ryb7mf83Ki3pYTzoS9QQXtpYsI',
          authDomain: 'e-office-tirta-benteng.firebaseapp.com',
          projectId: 'e-office-tirta-benteng',
          storageBucket: 'e-office-tirta-benteng.appspot.com',
          messagingSenderId: '167357250501',
          appId: '1:167357250501:web:b6d39366aa470ca3f369ac',
          measurementId: 'G-YEGK68HSEJ'
        });
      }

      const messaging = firebase.messaging();
      const tokenInLocalForage = await localforage.getItem('fcm_token');

      // Return the token if it's already in local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request permission for push notifications
      const status = await Notification.requestPermission();
      if (status === 'granted') {
        // Get new token from Firebase
        const fcm_token = await messaging.getToken({
          vapidKey: 'BGhGUWlNz0efp-91EgV1OfvRvb38nKWBfRam47LCoRvwQa9jgnBl8WhDQPq9F_MHb5KXM3KlBvL5vA4ycSJzxAQ' // Replace with your VAPID key
        });

        // Set token in local storage
        if (fcm_token) {
          localforage.setItem('fcm_token', fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
};

export { firebaseCloudMessaging };
