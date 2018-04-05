function errorsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_ERROR":
      return {...state, error: action.error}
    case "REMOVE_ERROR":
      return state.filter((error, i) => i !== action.index)
    default:
      return state;
  }
}


export default errorsReducer;