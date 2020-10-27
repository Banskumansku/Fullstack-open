import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('text')

    const handleLogin = async (event) => {
        event.preventDefault()
        await dispatch(login({ username: username.value, password: password.value }))
    }


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username <input {...username} />
                </div>
                <div>
                    password <input {...password} />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm