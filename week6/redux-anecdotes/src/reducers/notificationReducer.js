const startValue = ''

const notificationReducer = (state = startValue, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.content
        case 'RESET_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const newNotification = (content, time) => {
    return async dispatch => {
        setTimeout(
            () => dispatch({ type: 'RESET_NOTIFICATION' }),
            time*1000
        );
        dispatch({
            type: 'NEW_NOTIFICATION',
            content
        })
    }
}

export default notificationReducer