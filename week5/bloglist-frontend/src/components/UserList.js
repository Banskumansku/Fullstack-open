import React from 'react'
import { useSelector } from 'react-redux'
import {
    Link
} from "react-router-dom"


const AccountList = () => {
    const users = useSelector(state => state.accounts)

    return (<div>
        <ul>
            {users.map(user =>
                <li key={user.id} >
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            )}
        </ul>

    </div>
    )

}


export default AccountList