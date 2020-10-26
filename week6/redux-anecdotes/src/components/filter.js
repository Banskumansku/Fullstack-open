import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        const content = event.target.value
        props.filterChange(content)
    }

    return (
        <div>
            <input name="filter" onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    filterChange
}

const ConnectedFilter = connect(undefined, mapDispatchToProps)(Filter)
export default ConnectedFilter