import { useState, useRef } from 'react'
import { fetchGridData } from '../backend-utils/fetchData';
import { round2, round5, roundXToY } from '../misc/utils';

const useGrid = (grid_id, widthPx, heightPx) => {
    const grid_data = fetchGridData(grid_id)

    const [focusedCell, setFocusedCell] = useState({ row: 0, column: 0 })

    const [moduleData, setModuleData] = useState(grid_data.modules)
    //size of array referes to amount of rows/columns
    //value of each index refers to percentage size of row/column
    const [rowsSize, setRowsSize] = useState(grid_data.dimensions.rows)
    const [columnsSize, setColumnsSize] = useState(grid_data.dimensions.columns)

    const resizeStep = 5

    //Uses Ref since this function is called by an event handler
    const rowsSizeRef = useRef(rowsSize)
    rowsSizeRef.current = rowsSize;
    const increaseRowSize = (indexR, additionalSize) => {
        const additionalSizePercent = roundXToY(additionalSize / heightPx * 100, resizeStep);

        const newRowsSize = rowsSize.slice(0)
        newRowsSize[indexR] = roundXToY(newRowsSize[indexR] + additionalSizePercent, resizeStep)
        newRowsSize[indexR+1] -= (newRowsSize[indexR] - rowsSize[indexR])

        if (newRowsSize.some(r => r <= 0)) return "No space available"
        if ((newRowsSize[indexR] - rowsSizeRef.current[indexR]) != 0) setRowsSize(newRowsSize)
    }

    //Uses Ref since this function is called by an event handler
    const columnsSizeRef = useRef(columnsSize)
    columnsSizeRef.current = columnsSize;
    const increaseColumnSize = (indexC, additionalSize) => {
        const additionalSizePercent = roundXToY(additionalSize / widthPx * 100, resizeStep);

        const newColumnsSize = columnsSize.slice(0)
        newColumnsSize[indexC] = roundXToY(newColumnsSize[indexC] + additionalSizePercent, resizeStep)
        newColumnsSize[indexC+1] -= (newColumnsSize[indexC] - columnsSize[indexC])

        if (newColumnsSize.some(c => c <= 0)) return "No space available"
        if ((newColumnsSize[indexC] - columnsSizeRef.current[indexC]) != 0) setColumnsSize(newColumnsSize)
    }

    const setFocus = (r, c) => {
        setFocusedCell({ row: r, column: c })
    }

    //Splits row in half to create a new row
    const splitRow = () => {
        const indexR = focusedCell.row
        const sizeOfNewRow = roundXToY(rowsSize[indexR]/2, resizeStep);

        const newRowsSize = rowsSize.slice(0)
        newRowsSize.splice(indexR, 0, sizeOfNewRow)
        newRowsSize[indexR + 1] -= newRowsSize[indexR]

        const newModuleData = moduleData.slice(0)
        newModuleData.splice(indexR, 0, columnsSize.map(cSize => "generic"))

        if (newRowsSize.some(r => r <= 0)) return "No space available"
        setRowsSize(newRowsSize)
        setModuleData(newModuleData)
    }

    //Splits column in half to create new column
    const splitColumn = () => {
        const indexC = focusedCell.column
        const sizeOfNewColumn = roundXToY(columnsSize[indexC]/2, resizeStep);

        const newColumnsSize = columnsSize.slice(0)
        newColumnsSize.splice(indexC, 0, sizeOfNewColumn)
        newColumnsSize[indexC + 1] -= newColumnsSize[indexC]

        const newModuleData = moduleData.slice(0)

        newModuleData.forEach(row => row.splice(indexC, 0, "generic"))
        
        if (newColumnsSize.some(c => c <= 0)) return "No space available"
        setColumnsSize(newColumnsSize)
        setModuleData(newModuleData)
    }
    return [rowsSize, increaseRowSize,
        columnsSize, increaseColumnSize,
        moduleData,
        focusedCell, setFocus,
        splitRow, splitColumn,
    ]
}

export default useGrid