import { useState, useRef } from 'react'
import { fetchGridData } from '../backend-utils/fetchData';

const useGrid = (grid_id, widthPx, heightPx) => {
    const grid_data = fetchGridData(grid_id)

    const [focusedCell, setFocusedCell] = useState({ row: 0, column: 0 })

    const [moduleData, setModuleData] = useState(grid_data.modules)
    //size of array referes to amount of rows/columns
    //value of each index refers to percentage size of row/column
    const [rowsSize, setRowsSize] = useState(grid_data.dimensions.rows)
    const [columnsSize, setColumnsSize] = useState(grid_data.dimensions.columns)

    //Uses Ref since this function is called by an event handler
    const rowsSizeRef = useRef(rowsSize)
    rowsSizeRef.current = rowsSize;
    const setRowSize = (indexR, additionalSize) => {
        const additionalSizePercent = Math.round(additionalSize / heightPx * 100);

        const newRowsSize = rowsSize.map((r, i) => {
            if (i == indexR) return r + additionalSizePercent
            if (i == indexR + 1) return r - additionalSizePercent
            return r
        })

        if ((newRowsSize[indexR] - rowsSizeRef.current[indexR]) != 0) setRowsSize(newRowsSize)
    }

    //Uses Ref since this function is called by an event handler
    const columnsSizeRef = useRef(columnsSize)
    columnsSizeRef.current = columnsSize;
    const setColumnSize = (indexC, additionalSize) => {
        const additionalSizePercent = Math.round(additionalSize / widthPx * 100);

        const newColumnsSize = columnsSize.map((c, i) => {
            if (i == indexC) return c + additionalSizePercent
            if (i == indexC + 1) return c - additionalSizePercent
            return c
        })

        if ((newColumnsSize[indexC] - columnsSizeRef.current[indexC]) != 0) setColumnsSize(newColumnsSize)
    }

    const setFocus = (r, c) => {
        setFocusedCell({ row: r, column: c })
    }

    const splitRow = () => {
        const indexR = focusedCell.row
        const sizeOfNewRow = rowsSize[indexR] / 2;

        const newRowsSize = rowsSize.slice(0)
        newRowsSize.splice(indexR, 0, sizeOfNewRow)
        newRowsSize[indexR + 1] = sizeOfNewRow

        const newModuleData = moduleData.slice(0)
        newModuleData.splice(indexR, 0, columnsSize.map(cSize => "generic"))

        setRowsSize(newRowsSize)
        setModuleData(newModuleData)
    }

    const splitColumn = () => {
        const indexC = focusedCell.column
        const sizeOfNewColumn = columnsSize[indexC] / 2;

        const newColumnsSize = columnsSize.slice(0)
        newColumnsSize.splice(indexC, 0, sizeOfNewColumn)
        newColumnsSize[indexC + 1] = sizeOfNewColumn

        let newModuleData = moduleData.slice(0)

        newModuleData.forEach(row => row.splice(indexC, 0, "generic"))

        setColumnsSize(newColumnsSize)
        setModuleData(newModuleData)
    }

    return [rowsSize, setRowSize, columnsSize, setColumnSize, moduleData, focusedCell, setFocus, splitRow, splitColumn]
}

export default useGrid