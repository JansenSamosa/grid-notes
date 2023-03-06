import { memo, useEffect, useRef, useState } from "react"
import ModuleHolder from "./cell_modules/ModuleHolder"

import '../App.css'

const Cell = (props) => {

    const { columnSize, rowSize } = props
    const { xPos, yPos } = props
    const { increaseRowSize, increaseColumnSize } = props
    const { indexC, indexR } = props
    const { isLastRow, isLastColumn } = props
    const { setFocus } = props

    const beginResize = (mouseStartEvent) => {
        const draggerClassName = mouseStartEvent.target.className

        let intialPos = { x: mouseStartEvent.pageX, y: mouseStartEvent.pageY }

        const resize = (mouseMoveEvent) => {
            if (draggerClassName == 'draggerSE' || draggerClassName == 'draggerE') {
                increaseColumnSize(indexC, mouseMoveEvent.pageX - intialPos.x)
            }
            if (draggerClassName == 'draggerSE' || draggerClassName == 'draggerS') {
                increaseRowSize(indexR, mouseMoveEvent.pageY - intialPos.y)
            }
        }

        const endResize = (mouseEndEvent) => {
            window.removeEventListener("mousemove", resize)
        }

        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", endResize, { once: true })
    }

    const cellStyle = {
        width: `${columnSize}%`,
        height: `${rowSize}%`,
        left: `${xPos}%`,
        top: `${yPos}%`
    }

    return (
        <div className='cell' style={cellStyle} onFocus={() => setFocus(indexR, indexC)}>
            <div
                className='draggerSE'
                onMouseDown={beginResize}
                style={{ display: isLastColumn || isLastRow ? 'none' : 'block' }}
            />
            <div
                className='draggerE'
                onMouseDown={beginResize}
                style={{ display: isLastColumn ? 'none' : 'block' }}
            />
            <div
                className='draggerS'
                onMouseDown={beginResize}
                style={{ display: isLastRow ? 'none' : 'block' }}
            />
            <ModuleHolder module_id={props.module_id} />
        </div>
    )
}

export default Cell