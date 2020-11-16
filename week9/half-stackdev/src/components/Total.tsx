import React, { FC } from 'react'


interface PartProps {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    parts: PartProps[]
}


const Total: FC<ContentProps> = (props) => {
    return (
        <div>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}


export default Total
