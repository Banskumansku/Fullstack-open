
import React, { FC } from 'react'
import { CoursePart } from '../types'

const Part: FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <div>Name: {part.name} </div>
                    <div>Description: {part.description} </div >
                    <div>Exercises: {part.exerciseCount} </div >
                </div >
            );
        case "Using props to pass data":
            return (
                <div>
                    <div>Name: {part.name} </div>
                    <div>Group exercises: {part.groupProjectCount} </div>
                    <div>Exercises: {part.exerciseCount} </div>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <div>Name: {part.name} </div>
                    <div>Submission link: {part.exerciseSubmissionLink} </div>
                    <div>Exercises: {part.exerciseCount} </div>
                </div>
            );
        case "Some course":
            return (
                <div>
                    <div>Name: {part.name} </div>
                    <div>Description: {part.description} </div >
                    <div>Exercises: {part.exerciseCount} </div >
                </div>
            )
        default:
            return <div></div>;
    }
}

export default Part