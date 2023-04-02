import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// import Constants from 'expo-constants'

// console.log('Constants.expoConfig.extra.FIREBASE_API_KEY', Constants.expoConfig.extra.FIREBASE_API_KEY)
// Initialize Firebase
// const firebaseConfig = {
// 	apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
// 	authDomain: Constants.expoConfig.extra.FIREBASE_AUTH_DOMAIN,
// 	// databaseURL: FIREBASE_DATABASE_URL,
// 	projectId: Constants.expoConfig.extra.FIREBASE_PROJECT_ID,
// 	storageBucket: Constants.expoConfig.extra.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: Constants.expoConfig.extra.FIREBASE_MESSAGING_SENDER_ID,
// 	appId: Constants.expoConfig.extra.FIREBASE_APP_ID,
// 	measurementId: Constants.expoConfig.extra.FIREBASE_MEASUREMENT_ID
// }
const firebaseConfig = {
	apiKey: 'AIzaSyD75MqjOpAvrZckVfYg9olDuZ-tXfZ2Sgk',
	authDomain: 'zauchenika-356c9.firebaseapp.com',
	projectId: 'zauchenika-356c9',
	storageBucket: 'zauchenika-356c9.appspot.com',
	messagingSenderId: '493922924089',
	appId: '1:493922924089:web:f2d5af91a80141d3b4bfe8',
	measurementId: 'G-EEP1WWLR45'
}

let app

if (getApps().length === 0) {
	app = initializeApp(firebaseConfig)
} else {
	app = getApp()
}

const auth = getAuth()
const db = initializeFirestore(app, {
	experimentalForceLongPolling: true
})
const storage = getStorage(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { auth, db, storage }
