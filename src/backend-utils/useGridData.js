import { useContext, useState, useEffect, useRef } from "react"
import { FirebaseContext } from "./useFirebase"

import { ref, set, push, onValue, remove } from "firebase/database"

export const useGridData = (dbPath, grid_id) => {
    const { database } = useContext(FirebaseContext)

    const [moduleData, setModuleData] = useState(null)

    //size of array referes to amount of rows/columns
    //value of each index refers to percentage size of row/column
    const [rowsSize, setRowsSize] = useState(null)
    const [columnsSize, setColumnsSize] = useState(null)

    const saveTimer = useRef()

    //Load data from database when component mounts
    useEffect(() => {
        retrieveGridData()

        return () => {
            window.clearTimeout(saveTimer.current)
        }
    }, [])

    //Update data on database when the data changes
    useEffect(() => {
        if (rowsSize != null && columnsSize != null && moduleData != null) {
            delayWriteGridData(1)
        }
    }, [rowsSize, columnsSize, moduleData])

    const gridRef = ref(database, dbPath + grid_id)

    const retrieveGridData = () => {
        onValue(gridRef, snapshot => {
            const { dimensions, modules } = snapshot.val()
            console.log(snapshot.val())
            setRowsSize(JSON.parse(dimensions.rows))
            setColumnsSize(JSON.parse(dimensions.columns))
            setModuleData(JSON.parse(modules))

            console.log(`Retrieved grid ${grid_id} data`)
        }, {
            onlyOnce: true
        })
    }

    
    const delayWriteGridData = seconds => {
        window.clearTimeout(saveTimer.current)
        saveTimer.current = window.setTimeout(() => {
            writeGridData()
        }, seconds * 1000)
    }

    const writeGridData = () => {
        set(gridRef, {
            dimensions: {
                rows: JSON.stringify(rowsSize),
                columns: JSON.stringify(columnsSize)
            },
            modules: JSON.stringify(moduleData)
        }).then(() => {
            console.log(`Saved grid ${grid_id}`)
        })
    }

    const createNewModule = () => {
        const modulesRef = ref(database, "modules")
        const newModuleRef = push(modulesRef)
        set(newModuleRef, {
            data: {
                text: ``
            },
            module_type: "text"
        })
        return newModuleRef.key
    }

    const deleteRowOfModuleData = r => {
        moduleData[r].forEach(module_id => deleteModuleData(module_id))
    }

    const deleteColumnOfModuleData = c => {
        moduleData.forEach(row => deleteModuleData(row[c]))
    }

    const deleteModuleData = module_id => {
        const moduleRef = ref(database, 'modules/' + module_id)
        remove(moduleRef)
    }

    return [rowsSize, columnsSize,
        setRowsSize, setColumnsSize,
        deleteRowOfModuleData, deleteColumnOfModuleData,
        moduleData, setModuleData, createNewModule]
}