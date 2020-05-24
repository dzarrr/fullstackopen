import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Votes = ({count}) => (
  <p>
    has {count} votes
  </p>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(props.anecdotes.length).fill(0))

  const selectAnecdote = () => {
    return setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const voteAnecdote = (selected) => {
    let newState = [...vote]
    newState[selected] += 1

    return () => setVote(newState)
  }

  const mostVoted = vote.reduce((maxIndex, currentValue, currentIndex, vote) => {
      if (currentValue > vote[maxIndex]) {
        return currentIndex
      } else {
        return maxIndex
      }
    }, 0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}
      </p>
      <Votes count={vote[selected]} />
      <Button onClick={voteAnecdote(selected)} text="Vote"></Button>
      <Button onClick={selectAnecdote} text="Next Anecdote"></Button>

      <h1>Anecdote with most votes</h1>
      <p>
        {props.anecdotes[mostVoted]}
      </p>
      <Votes count={vote[mostVoted]} />
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
  <App anecdotes={anecdotes}/>, document.getElementById('root')
);
