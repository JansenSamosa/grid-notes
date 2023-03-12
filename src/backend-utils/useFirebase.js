import { createContext, useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

export const useFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyD-LPbCzTFCO8AIePgSMGUnvaSb723wTQY",
        authDomain: "grid-notes-cf290.firebaseapp.com",
        projectId: "grid-notes-cf290",
        storageBucket: "grid-notes-cf290.appspot.com",
        messagingSenderId: "580915768218",
        appId: "1:580915768218:web:0ef1d01c8911ffa4ee6823",
        measurementId: "G-DSMKE9FFEG",

        databaseURL: "https://grid-notes-cf290-default-rtdb.firebaseio.com/"
    };


    const [app, setApp] = useState(initializeApp(firebaseConfig))
    const [analytics, setAnalytics] = useState(getAnalytics(app))
    const [database, setDatabase] = useState(getDatabase(app))

    return [app, analytics, database]
}

export const FirebaseContext = createContext({})