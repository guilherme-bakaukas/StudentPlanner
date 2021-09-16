import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import DatabaseManager from '../services/userServices.js'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

   const [currentUser, setCurrentUser] = useState()
   const [loading, setLoading] = useState(true)

   const databaseManager = new DatabaseManager()

   function signUp(email, password) {
       console.log("Entered signUP")
       return auth.createUserWithEmailAndPassword(email, password).then(result => {
           setCurrentUser(result.user)
           return databaseManager.createUserIfNeeded(result.user)
          
       })
       .catch(error => {
           console.log(error)
           return Promise.reject(error)
       })
   }

   function login(email, password) {
       return auth.signInWithEmailAndPassword(email, password).then(result => {
           setCurrentUser(result.user)
           return databaseManager.createUserIfNeeded(result.user)
       })
       .catch(error => {
           console.log(error)
           return Promise.reject(error)
       })
   }

   useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
           setCurrentUser(user)
           setLoading(false)
       })

       return unsubscribe
   }, [])

   const value = {
       currentUser,
       login,
       signUp
   }

   auth.languageCode = 'pt'

   return (
       <AuthContext.Provider value={value}>
           { children }
       </AuthContext.Provider>
   )
}
