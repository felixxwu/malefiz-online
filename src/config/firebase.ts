// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOC7YHhrMd-Hs62pCYVDoAfkJehgccxvU',
  authDomain: 'malefiz-online.firebaseapp.com',
  projectId: 'malefiz-online',
  storageBucket: 'malefiz-online.appspot.com',
  messagingSenderId: '295496109260',
  appId: '1:295496109260:web:88c840d2c623fc6d720669',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
