import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDUynCZDpPSsHye109Xg5iWtpcp8J1oC5w",
    authDomain: "vuegram-app.firebaseapp.com",
    databaseURL: "https://vuegram-app.firebaseio.com",
    projectId: "vuegram-app",
    storageBucket: "vuegram-app.appspot.com",
    messagingSenderId: "319659655168"
})

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

const settings = {
    timestampsInSnapshots: true
}

db.settings(settings)

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}