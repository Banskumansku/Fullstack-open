import anecdoteService from '../services/anecdotes'


const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_ANECDOTE':
      return action.data.sort((a, b) => a.votes > b.votes ? -1 : 1)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const id = action.data
      const anecdoteToChange = state.find(n => n.id === id)
      console.log(action.data)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      state = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return state.sort((a, b) => a.votes > b.votes ? -1 : 1)
    default:
      return state
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updateTo = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(updateTo)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote.id
    })
  }
}


export default reducer