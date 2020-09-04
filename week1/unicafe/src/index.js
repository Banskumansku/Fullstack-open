import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// oikea paikka komponentin määrittelyyn
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all !== 0) {
    const ave = (good - bad) / all;
    const pos = (good / all) * 100;
    const positive = pos + ' %'
    return (
      <div>
        <h1>Stats</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={ave} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      </div >
    )
  }
  return (<div>
    <h1>Stats</h1>
    <p>no feedback given yet</p>
  </div >)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)