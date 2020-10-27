import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'


const BlogForm = () => {
    const dispatch = useDispatch()

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const addBlog = async (event) => {
        event.preventDefault()
        dispatch(createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        }))
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <h1>create new</h1>
                <div>title:
                    <input {...title}
                    />
                </div>
                <div>author:
                    <input {...author} />
                </div>
                <div>url:
                    <input {...url}/>
                </div>
                <button id='blogSubmitButton' type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm