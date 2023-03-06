import { useEffect, useState } from 'react'

import Text_module from './Text_module'

import { fetchModuleData } from '../../backend-utils/fetchData'

import './Modules.css'

const ModuleHolder = (props) => {
    const [data, setData] = useState(fetchModuleData(props.module_id).data)

    useEffect(() => {
        setData(fetchModuleData(props.module_id).data)
    }, [props.module_id])

    return (
        <div className='module-holder'>
            <Text_module text={data.text} setData={setData}/>
        </div>
    )
}

export default ModuleHolder