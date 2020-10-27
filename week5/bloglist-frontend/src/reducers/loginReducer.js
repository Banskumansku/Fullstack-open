import loginService from '../services/login'
import blogService from '../services/blogs'
import { newNotification } from './notificationReducer'


const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const userInStorage = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'INIT_USER',
                data: user
            })
        }

    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(newNotification(`${user.name} welcome back!`, 5))
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const logout = () => {
    window.localStorage.clear()
    blogService.clearToken()
    return dispatch => {
        dispatch({
            type: 'LOGOUT'
        })

    }
}

export default reducer