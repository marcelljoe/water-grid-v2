importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAKzoxx2Ryb7mf83Ki3pYTzoS9QQXtpYsI',
  authDomain: 'e-office-tirta-benteng.firebaseapp.com',
  projectId: 'e-office-tirta-benteng',
  storageBucket: 'e-office-tirta-benteng.appspot.com',
  messagingSenderId: '167357250501',
  appId: '1:167357250501:web:b6d39366aa470ca3f369ac',
  measurementId: 'G-YEGK68HSEJ'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
