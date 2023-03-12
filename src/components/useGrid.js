import { useState, useRef, useEffect } from 'react'
import { fetchGridData } from '../backend-utils/fetchData';
import { useGridData } from '../backend-utils/useGridData';
import { round2, round5, roundXToY } from '../misc/utils';


const useGrid = (dbPath, grid_id, widthPx, heightPx) => {
    const [rowsSize, columnsSize,
        setRowsSize, setColumnsSize,
        deleteRowOfModuleData, deleteColumnOfModuleData,
        moduleData, setModuleData, createNewModule]
        = useGridData(dbPath, grid_id)

    const [focusedCell, setFocusedCell] = useState({ row: 0, column: 0 })
   
    const snap = 2.5
    const deleteSensitivity = 0

    //resizeRow, resizeColumn, and finishResize are called by event handlers so these functions are "locked" into a snapshot in which
    //they cannot view the current state. These refs are used for the function to see out current state.
    const rowsSizeRef = useRef(rowsSize)
    const columnsSizeRef = useRef(columnsSize)
    rowsSizeRef.current = rowsSize;
    columnsSizeRef.current = columnsSize;

    const resizeRow = (indexR, additionalSize) => {
        const additionalSizePercent = roundXToY(additionalSize / heightPx * 100, snap);

        const newRowsSize = rowsSize.slice(0)
        newRowsSize[indexR] = roundXToY(newRowsSize[indexR] + additionalSizePercent, snap)
        newRowsSize[indexR + 1] -= (newRowsSize[indexR] - rowsSize[indexR])

        if (newRowsSize[indexR] <= -deleteSensitivity) {
            newRowsSize[indexR + 1] = newRowsSize[indexR] + newRowsSize[indexR + 1]
            newRowsSize[indexR] = 0
        } else if (newRowsSize[indexR + 1] <= -deleteSensitivity) {
            newRowsSize[indexR] = newRowsSize[indexR] + newRowsSize[indexR + 1]
            newRowsSize[indexR + 1] = 0
        } else {
            if (newRowsSize.some(r => r <= 0)) return "No space available"
        }

        if ((newRowsSize[indexR] - rowsSizeRef.current[indexR]) != 0) setRowsSize(newRowsSize)
    }

    const resizeColumn = (indexC, additionalSize) => {
        const additionalSizePercent = roundXToY(additionalSize / widthPx * 100, snap);

        const newColumnsSize = columnsSize.slice(0)
        newColumnsSize[indexC] = roundXToY(newColumnsSize[indexC] + additionalSizePercent, snap)
        newColumnsSize[indexC + 1] -= (newColumnsSize[indexC] - columnsSize[indexC])


        if (newColumnsSize[indexC] <= -deleteSensitivity) {
            newColumnsSize[indexC + 1] = newColumnsSize[indexC] + newColumnsSize[indexC + 1]
            newColumnsSize[indexC] = 0
        } else if (newColumnsSize[indexC + 1] <= -deleteSensitivity) {
            newColumnsSize[indexC] = newColumnsSize[indexC] + newColumnsSize[indexC + 1]
            newColumnsSize[indexC + 1] = 0
        } else {
            if (newColumnsSize.some(c => c <= 0)) return "No space available"
        }

        if ((newColumnsSize[indexC] - columnsSizeRef.current[indexC]) != 0) setColumnsSize(newColumnsSize)
    }

    //called when resizing of a cell is finished
    const finishResize = () => {
        //delete rows and columns which has a size of zero
        let rowToDelete = -1
        let columnToDelete = -1
        rowsSizeRef.current.forEach((rowSize, indexR) => {
            if (rowSize <= 0) rowToDelete = indexR
        })

        columnsSizeRef.current.forEach((columnSize, indexC) => {
            if (columnSize <= 0) columnToDelete = indexC
        })

        deleteRowOrColumn(rowToDelete, columnToDelete)
    }

    const deleteRowOrColumn = (indexR, indexC) => {
        let newModuleData = moduleData.slice(0)

        if (indexR != -1) {
            newModuleData = moduleData.filter((row, index) => index != indexR)
            setRowsSize(rowsSizeRef.current.filter((row, index) => index != indexR))
            deleteRowOfModuleData(indexR)
        }
        if (indexC != -1) {
            newModuleData = newModuleData.map(row => row.filter((column, index) => index != indexC))
            setColumnsSize(columnsSizeRef.current.filter((column, index) => index != indexC))
            deleteColumnOfModuleData(indexC)
        }
        setModuleData(newModuleData)
    }

    //Splits row in half to create a new row
    const splitRow = () => {
        const indexR = focusedCell.row
        const sizeOfNewRow = roundXToY(rowsSize[indexR] / 2, snap);

        const newRowsSize = rowsSize.slice(0)
        newRowsSize.splice(indexR, 0, sizeOfNewRow)
        newRowsSize[indexR + 1] -= newRowsSize[indexR]

        if (newRowsSize.some(r => r <= 0)) return "No space available"

        const newModuleData = moduleData.slice(0)
        newModuleData.splice(indexR + 1, 0, columnsSize.map(cSize => createNewModule()))

        setRowsSize(newRowsSize)
        setModuleData(newModuleData)
    }

    //Splits column in half to create new column
    const splitColumn = () => {
        const indexC = focusedCell.column
        const sizeOfNewColumn = roundXToY(columnsSize[indexC] / 2, snap);

        const newColumnsSize = columnsSize.slice(0)
        newColumnsSize.splice(indexC, 0, sizeOfNewColumn)
        newColumnsSize[indexC + 1] -= newColumnsSize[indexC]

        if (newColumnsSize.some(c => c <= 0)) return "No space available"

        const newModuleData = moduleData.slice(0)
        newModuleData.forEach(row => row.splice(indexC + 1, 0, createNewModule()))

        setColumnsSize(newColumnsSize)
        setModuleData(newModuleData)
    }

    const setFocus = (r, c) => {
        setFocusedCell({ row: r, column: c })
    }

    return [rowsSize, columnsSize,
        splitRow, splitColumn,
        resizeRow, resizeColumn, finishResize,
        moduleData,
        focusedCell, setFocus
    ]
}

export default useGrid