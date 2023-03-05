import { useState } from 'react'

import Text_module from './Text_module'

import { fetchModuleData } from '../../backend-utils/fetchData'

import './Modules.css'

const ModuleHolder = (props) => {
    const module_data = fetchModuleData(props.module_id)
    
    const [data, setData] = useState(module_data.data)

    return (
        <div className='module-holder'>
            <Text_module text={data.text} setData={setData}/>
        </div>
    )
}

export default ModuleHolder