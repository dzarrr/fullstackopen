import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)

const Title = (props) => <h1>{props.name}</h1>

const Statistics = ({ good, neutral, bad}) => {
  if ((good !== 0) || (neutral !== 0) || (bad !== 0)) {
    const all = good + neutral + bad
    const average = good + (bad * -1) / (all)
    const positive = (good / all) * 100

    return(
      <div>
        <Category name="good" count={good}/>
        <Category name="neutral" count={neutral}/>
        <Category name="bad" count={bad}/>
        <Category name="all" count={all}/>
        <Category name="average" count={average}/>
        <Category name="positive" count={positive} char="%"/>   
      </div>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )
}

const Category = ({name, count, char}) => (
  <p style={{margin: 0}}>
    {name} {count} {char}
  </p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (name) => {
    if (name === "good") {
      return setGood(good + 1)
    } else if (name === "neutral") {
      return setNeutral(neutral + 1)
    } else if (name === "bad") {
      return setBad(bad + 1)
    }
  }

  return(
    <div>
      <div>
        <Title name="give feedback"/>
        <Button onClick={() => handleClick('good')} name="good"/>
        <Button onClick={() => handleClick('neutral')} name="neutral"/>
        <Button onClick={() => handleClick('bad')} name="bad"/>
      </div>
      <div>
        <Title name="statistics"/>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
        />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);