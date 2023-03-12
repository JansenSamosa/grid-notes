import React, { useRef } from 'react'

const Text_module = (props) => {
    const { text, setData } = props
    
    const setText = e => {
        setData({ text: e.target.value })
    }

    let rerenders = useRef(0)
    rerenders.current++

    return (
        <>  
            <textarea className='text-module' value={`${text}`} onChange={setText}></textarea>
        </>
    )
}
//<p style={{position:'absolute', left:2, bottom:-10, color:'gray', userSelect:'none'}}>{rerenders.current}</p>

export default Text_module
