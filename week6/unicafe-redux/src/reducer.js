const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      initialState.good++
      state = initialState
      return state
    case 'OK':
      initialState.ok++
      state = initialState
      return state
    case 'BAD':
      initialState.bad++
      state = initialState
      return state
    case 'ZERO':
      initialState.good = 0
      initialState.ok = 0
      initialState.bad = 0
      state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer