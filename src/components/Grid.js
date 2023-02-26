import { useState } from 'react';
import Cell from './Cell';

import '../App.css'

const Grid = () => {
    //size of array referes to amount of rows/columns
    //value of each index refers to pixel size of row/column
    const [rows, setRows] = useState([200, 200, 200])
    const [columns, setColumns] = useState([200, 200, 200, 200 ])

    const setRowSize = (indexR, additionalSize) => {
        setRows(rows.map((r, i) => i == indexR ? r + additionalSize : r))
    }

    const setColumnSize = (indexC, additionalSize) => {
        setColumns(columns.map((c, i) => i == indexC ? c + additionalSize : c))
    }

    //sums up all elements in rows or columns array up to a certain index.
    const getCellXPos = (indexC) => columns.slice(0, indexC).reduce((a, b) => a + b, 0);
    const getCellYPos = (indexR) => rows.slice(0, indexR).reduce((a, b) => a + b, 0);

    return (
        <div className='grid'>
            {rows.map((sizeR, indexR) =>
                <div>
                    {columns.map((sizeC, indexC) => {
                        return <Cell
                            rowSize={sizeR}
                            indexR={indexR}

                            columnSize={sizeC}
                            indexC={indexC}

                            xPos={getCellXPos(indexC)}
                            yPos={getCellYPos(indexR)}

                            setRowSize={setRowSize}
                            setColumnSize={setColumnSize}
                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default Grid