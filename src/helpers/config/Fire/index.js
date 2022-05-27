import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAPIDExxjqb03m-XTL3JDlyi_emGDm3yok",
    authDomain: "ngopi-chat.firebaseapp.com",
    projectId: "ngopi-chat",
    storageBucket: "ngopi-chat.appspot.com",
    messagingSenderId: "747786100272",
    appId: "1:747786100272:web:188af9723cb4fca20097f5",
    measurementId: "G-RNV385X9MB",
    databaseURL: "https://ngopi-chat-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const Fire = firebase;

export default Fire;