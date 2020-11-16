import React, { FC } from 'react'
import { CoursePart } from '../types'
import Part from './Part'

const Content: FC<{courseParts: CoursePart[]}> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(p => 
        <Part key={p.name} part={p} />
      )}
    </>
  )
}


export default Content