import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGridData } from '../backend-utils/fetchData';

import Cell from './Cell';

import '../App.css'
import useGrid from './useGrid';

const Grid = ({ dbPath, grid_id, widthPx, heightPx }) => {

    const [rowsSize, columnsSize,
        splitRow, splitColumn,
        resizeRow, resizeColumn, finishResize,
        moduleData,
        focusedCell, setFocus
    ] = useGrid(dbPath, grid_id, widthPx, heightPx)

    //sums up all elements in rows or columns array up to a certain index.
    const getCellXPos = indexC => columnsSize.slice(0, indexC).reduce((a, b) => a + b, 0);
    const getCellYPos = indexR => rowsSize.slice(0, indexR).reduce((a, b) => a + b, 0);


    const renderColumn = (sizeR, indexR) => columnsSize.map((sizeC, indexC) => {
        return <Cell
            rowSize={sizeR}
            indexR={indexR}
            isLastRow={indexR == rowsSize.length - 1 ? true : false}
            resizeRow={resizeRow}

            columnSize={sizeC}
            indexC={indexC}
            isLastColumn={indexC == columnsSize.length - 1 ? true : false}
            resizeColumn={resizeColumn}

            finishResize={finishResize}

            setFocus={setFocus}

            xPos={getCellXPos(indexC)}
            yPos={getCellYPos(indexR)}

            module_id={moduleData[indexR][indexC]}

            key={`${moduleData[indexR][indexC]}`}
        />
    })
    
    const renderRows = () => rowsSize.map((sizeR, indexR) => {
        return <div key={`${indexR} ${moduleData[indexR][0]}`}>
            {renderColumn(sizeR, indexR)}
        </div>
    })
    
    if (rowsSize != null && columnsSize != null && moduleData != null) return (
        <>
            <button onClick={splitRow} style={{ position: 'fixed', top: 0, left: 0 }}>Split Row</button>
            <button onClick={splitColumn} style={{ position: 'fixed', top: 90, left: 0 }}>Split Column</button>

            <div className='grid' style={{ width: `${widthPx}px`, height: `${heightPx}px` }}>
                {renderRows()}
            </div>
        </>
    )
    else return <div>Loading...</div>
}

export default Grid