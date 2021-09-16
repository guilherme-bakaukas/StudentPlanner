import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAyNvmm_mntOLlor-fqc1dW0NsSrA2OYOg",
    authDomain: "student-planner-42a5c.firebaseapp.com",
    projectId: "student-planner-42a5c",
    storageBucket: "student-planner-42a5c.appspot.com",
    messagingSenderId: "968136859722",
    databaseURL: "https://student-planner-42a5c-default-rtdb.firebaseio.com/",
    appId: "1:968136859722:web:ffca910d520152ba8b06b3"
})

export const auth = app.auth()
export const database = app.database()
export default app
