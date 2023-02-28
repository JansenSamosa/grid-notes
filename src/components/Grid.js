import { useState } from 'react';
import { convertVhToPx, convertVwToPx } from '../misc/utils';

import Cell from './Cell';

import '../App.css'

const Grid = () => {
    const [gridSize, setGridSize] = useState({ widthVw: 50, aspectRatio: 11 / 8.5 })
    const { widthVw, aspectRatio } = gridSize
    const heightVw = widthVw * aspectRatio

    //size of array referes to amount of rows/columns
    //value of each index refers to percentage size of row/column
    const [rows, setRows] = useState([25,25,25,25])
    const [columns, setColumns] = useState([100 / 3, 100 / 3, 100 / 3])

    const setRowSize = (indexR, additionalSize) => {
        const additionalSizePercent = additionalSize / convertVwToPx(heightVw) * 100;

        setRows(rows.map((r, i) => {
            if (i == indexR) return r + additionalSizePercent
            if (i == indexR + 1) return r - additionalSizePercent
            return r
        }))
    }

    const setColumnSize = (indexC, additionalSize) => {
        const additionalSizePercent = additionalSize / convertVwToPx(widthVw) * 100;

        setColumns(columns.map((c, i) => {
            if (i == indexC) return c + additionalSizePercent
            if (i == indexC + 1) return c - additionalSizePercent
            return c
        }))
    }

    //sums up all elements in rows or columns array up to a certain index.
    const getCellXPos = (indexC) => columns.slice(0, indexC).reduce((a, b) => a + b, 0);
    const getCellYPos = (indexR) => rows.slice(0, indexR).reduce((a, b) => a + b, 0);

    return (
        <div className='grid' style={{ width: `${widthVw}vw`, height: `${heightVw}vw` }}>
            {rows.map((sizeR, indexR) =>
                <div key={`${indexR}`}>
                    {columns.map((sizeC, indexC) => {
                        return <Cell
                            rowSize={sizeR}
                            indexR={indexR}
                            setRowSize={setRowSize}
                            isLastRow={indexR == rows.length - 1 ? true : false}

                            columnSize={sizeC}
                            indexC={indexC}
                            setColumnSize={setColumnSize}
                            isLastColumn={indexC == columns.length - 1 ? true : false}

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