import { memo, useEffect, useRef, useState } from 'react'
 
import Text_module from './Text_module'
import Grid from '../Grid'
import { fetchModuleData } from '../../backend-utils/fetchData'

import './Modules.css'
import { useModuleData } from '../../backend-utils/useModuleData'

const ModuleHolder = ({ module_id }) => {
    const [data, setData, type] = useModuleData(module_id)
                             
    const holder = useRef()

    const getModuleByType = () => {
        if (type == "text") return <Text_module text={data.text} setData={setData} />
        else if (type == "sub_grid") return <Grid
            dbPath={`modules/${module_id}/`}
            grid_id={'data'}
            widthPx={holder.current.offsetWidth}
            heightPx={holder.current.offsetHeight}
        />
        else return <p>Loading...</p>
    }

    return (
        <div className='module-holder' ref={holder}>
            {getModuleByType()}
        </div>
    )
}

export default ModuleHolder