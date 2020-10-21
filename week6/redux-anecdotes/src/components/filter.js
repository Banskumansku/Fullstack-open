import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'



const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const content = event.target.value
        dispatch(filterChange(content))
    }

    return (
        <div>
            <input name="filter" onChange={handleChange} />
        </div>
    )
}

export default Filter