import { useState } from 'react';
import { convertVhToPx, convertVwToPx } from '../misc/utils';

import Cell from './Cell';

import '../App.css'

const Grid = (props) => {
    const { widthVw, aspectRatio } = props.gridSize
    const heightVw = widthVw * aspectRatio

    //size of array referes to amount of rows/columns
    //value of each index refers to percentage size of row/column
    const [rows, setRows] = useState([100 / 8, 100 / 8, 100 / 8, 100 / 8, 100 / 8, 100 / 8, 100 / 8, 100 / 8])
    const [columns, setColumns] = useState([25, 75])

    const [focusedCell, setFocusedCell] = useState({ row: 0, column: 0 })

    const setRowSize = (indexR, additionalSize) => {
        //const additionalSizePercent = additionalSize / convertVwToPx(heightVw) * 100;

        const additionalSizePercent = additionalSize / heightVw * 100;

        setRows(rows.map((r, i) => {
            if (i == indexR) return r + additionalSizePercent
            if (i == indexR + 1) return r - additionalSizePercent
            return r
        }))
    }

    const setColumnSize = (indexC, additionalSize) => {
        //const additionalSizePercent = additionalSize / convertVwToPx(widthVw) * 100;

        const additionalSizePercent = additionalSize / widthVw * 100;

        setColumns(columns.map((c, i) => {
            if (i == indexC) return c + additionalSizePercent
            if (i == indexC + 1) return c - additionalSizePercent
            return c
        }))
    }

    const setFocus = (r, c) => {
        setFocusedCell({ row: r, column: c })
    }

    //sums up all elements in rows or columns array up to a certain index.
    const getCellXPos = (indexC) => columns.slice(0, indexC).reduce((a, b) => a + b, 0);
    const getCellYPos = (indexR) => rows.slice(0, indexR).reduce((a, b) => a + b, 0);

    return (
        <div className='grid' style={{ width: `${widthVw}px`, height: `${heightVw}px` }}>
            {rows.map((sizeR, indexR) =>
                <div key={`${indexR}`}>
                    {columns.map((sizeC, indexC) => {
                        return <Cell
                            rowSize={sizeR}
                            indexR={indexR}
                            isLastRow={indexR == rows.length - 1 ? true : false}
                            setRowSize={setRowSize}

                            columnSize={sizeC}
                            indexC={indexC}
                            isLastColumn={indexC == columns.length - 1 ? true : false}
                            setColumnSize={setColumnSize}

                            setFocus={setFocus}

                            xPos={getCellXPos(indexC)}
                            yPos={getCellYPos(indexR)}

                            key={`${indexR}, ${indexC}`}

                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default Grid