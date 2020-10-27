import blogService from '../services/blogs'


const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data.sort((a, b) => a.likes > b.likes ? -1 : 1)
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            const id = action.data.id
            const changedBlog = action.data
            state = state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
            return state.sort((a, b) => a.likes > b.likes ? -1 : 1)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updateTo = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1
        }
        const updatedBlog = await blogService.update(updateTo.id, updateTo)

        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}


export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog.id
        })
    }
}
export default reducer