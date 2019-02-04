import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDUQOMK8H0Y5pzhIT7PBaODbihj4gvhf8A",
    authDomain: "fivestarfans-c4756.firebaseapp.com",
    databaseURL: "https://fivestarfans-c4756.firebaseio.com",
    projectId: "fivestarfans-c4756",
    storageBucket: "fivestarfans-c4756.appspot.com",
    messagingSenderId: "740188599393"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;