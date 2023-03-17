import {initializeApp} from "firebase/app"

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBEo7Y5wifKVf1A32Uue0yZbyIcBgZw27s",
    authDomain: "eutopic-staging-efa58.firebaseapp.com",
    projectId: "eutopic-staging-efa58",
    storageBucket: "eutopic-staging-efa58.appspot.com",
    messagingSenderId: "1041096392429",
    appId: "1:1041096392429:web:7ef0bc8ee29438a4bc96e4",
    measurementId: "G-TK2X6GWJXX"
  }

  return initializeApp(firebaseConfig)
}
