import grid_data from '../misc/grid-data.json'
import module_data from '../misc/module-data.json'

export const fetchGridData = grid_id => {
    return grid_data.grids.find(grid => grid.grid_id == grid_id)
}

export const fetchModuleData = module_id => {

    return module_data.modules.find(module => module.module_id == module_id)
}