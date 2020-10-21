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

export const newNotification = content => {
    return {
        type: 'NEW_NOTIFICATION',
        content
    }
}

export const resetNotification = () => {
    return {
        type: 'RESET_NOTIFICATION'
    }
}

export default notificationReducer