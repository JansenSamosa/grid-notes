import { useState } from "react"
import ModuleHolder from "./cell_modules/ModuleHolder"

import '../App.css'

const Cell = (props) => {
    const { columnSize, rowSize, xPos, yPos, setRowSize, setColumnSize, indexC, indexR } = props

    const getCellStyle = {
        width: columnSize,
        height: rowSize,
        left: xPos,
        top: yPos
    }

    const beginResize = (mouseStartEvent) => {
        const draggerClass = mouseStartEvent.target.className
        console.log(mouseStartEvent)
        const intialPos = { x: mouseStartEvent.pageX, y: mouseStartEvent.pageY }

        const resize = (mouseMoveEvent) => {
            if (draggerClass == 'draggerSE' || draggerClass == 'draggerE') {
                setColumnSize(indexC, mouseMoveEvent.pageX - intialPos.x)
            }
            if (draggerClass == 'draggerSE' || draggerClass == 'draggerS') {
                setRowSize(indexR, mouseMoveEvent.pageY - intialPos.y)
            }
        }

        const endResize = (mouseEndEvent) => {
            window.removeEventListener("mousemove", resize)
        }

        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", endResize, { once: true })
    }


    return (
        <div className='cell' style={getCellStyle}>
            <div
                className='draggerSE'
                onMouseDown={beginResize}
            />
            <div
                className='draggerE'
                onMouseDown={beginResize}
            />
            <div
                className='draggerS'
                onMouseDown={beginResize}
            />
            <ModuleHolder/>
        </div>
    )
}

export default Cell