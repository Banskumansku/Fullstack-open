import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const voteAnecdote = (anecdote) => {
        props.voteForAnecdote(anecdote)
        props.newNotification(`you voted for ${anecdote.content}`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter.length > 0) {
        return {
            anecdotes : state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
    } else {
        return {
            anecdotes: state.anecdotes
        }
    }
}

const mapDispatchToProps = {
    voteForAnecdote,
    newNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes