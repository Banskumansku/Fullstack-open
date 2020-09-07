import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    const sum = course.parts.reduce((a, b) => a + b.exercises, 0)

    return (
        <div>
            <Header header={course.name} />
            <ul>
                {course.parts.map((content, i) =>
                    <Content key={i} content={content} />
                )}
            </ul>
            <h3>Total exercises: {sum}</h3>
        </div>
    )
}

export default Course