import React from 'react'
import { useSelector } from 'react-redux'
import {
    Link
} from "react-router-dom"


const BlogList = () => {
    const blogs = useSelector(state => state.blogList)

    return (<div>
        <ul>
            {blogs.map(blog =>
                <li>
                    <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            )}
        </ul>
    </div>
    )

}


export default BlogList