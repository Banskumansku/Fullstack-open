import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const points = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {
    console.log(selected)
    points[selected] += 1
    console.log(points)
  }

  return (
    <div>
      {props.anecdotes[selected]} 
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)