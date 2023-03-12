import { useState, useContext, useEffect, useRef } from "react"
import { FirebaseContext } from "./useFirebase"

import { ref, set, onValue } from "firebase/database"

export const useModuleData = module_id => {
    const { database } = useContext(FirebaseContext)

    const [data, setData] = useState(null)
    const [type, setType] = useState(null)
    const saveTimer = useRef()

    useEffect(() => {
        retrieveModuleData()

        return () => {
            window.clearTimeout(saveTimer.current)
        }
    }, [])

    useEffect(() => {
        if (data != null && type != null) {
            delayWriteModuleData(1)
        }
    }, [data, type])

    const delayWriteModuleData = seconds => {
        window.clearTimeout(saveTimer.current)
        saveTimer.current = window.setTimeout(() => {
            writeModuleData()
        }, seconds * 1000)
    }

    const writeModuleData = () => {
        const moduleRef = ref(database, 'modules/' + module_id)
        if (type == "text") {
            set(moduleRef, {
                data: data,
                module_type: type
            }).then(() => {
                console.log(`Saved module ${module_id}`)
            })
        }
    }

    const retrieveModuleData = () => {
        const moduleRef = ref(database, 'modules/' + module_id)

        onValue(moduleRef, snapshot => {
            console.log('modules/' + module_id)
            const { data, module_type } = snapshot.val()
            setData(data)
            setType(module_type)
            console.log(`Retrieved module ${module_id} data`)
        }, {
            onlyOnce: false
        })
    }

    return [data, setData, type]
}