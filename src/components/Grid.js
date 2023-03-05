import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGridData } from '../backend-utils/fetchData';

import { areEqual } from '../misc/utils';
import { round2, round5 } from '../misc/utils';
import Cell from './Cell';

import '../App.css'
import useGrid from './useGrid';

const Grid = ({ grid_id }) => {
    const widthPx = 900
    const aspectRatio = 11 / 8.5
    const heightPx = widthPx * aspectRatio

    const [rowsSize, setRowSize,
        columnsSize, setColumnSize,
        moduleData,
        focusedCell, setFocus,
        splitRow, splitColumn
    ] = useGrid(grid_id, widthPx, heightPx)

    //sums up all elements in rows or columns array up to a certain index.
    const getCellXPos = useCallback(indexC => columnsSize.slice(0, indexC).reduce((a, b) => a + b, 0));
    const getCellYPos = useCallback(indexR => rowsSize.slice(0, indexR).reduce((a, b) => a + b, 0));

    return (
        <>
            <button onClick={splitRow} style={{position:'fixed'}}>Split Row</button>
            <button onClick={splitColumn} style={{position:'fixed', top:90}}>Split Column</button>
            <div className='grid' style={{ width: `${widthPx}px`, height: `${heightPx}px` }}>
                {rowsSize.map((sizeR, indexR) =>
                    <div key={`${indexR}`}>
                        {columnsSize.map((sizeC, indexC) => {
                            return <Cell
                                rowSize={sizeR}
                                indexR={indexR}
                                isLastRow={indexR == rowsSize.length - 1 ? true : false}
                                setRowSize={setRowSize}

                                columnSize={sizeC}
                                indexC={indexC}
                                isLastColumn={indexC == columnsSize.length - 1 ? true : false}
                                setColumnSize={setColumnSize}

                                setFocus={setFocus}

                                xPos={getCellXPos(indexC)}
                                yPos={getCellYPos(indexR)}

                                module_id={moduleData[indexR][indexC]}

                                key={`${indexR}, ${indexC}`}
                            />
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default Grid