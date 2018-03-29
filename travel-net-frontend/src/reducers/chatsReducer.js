
import {FETCHING_CHAT, FETCHED_CHAT, SENT_MESSAGE, SHOW_CHAT} from '../actions/chats'

export const chatsState = {
  isLoading: false,
  chatroom: '',
}

function chatsReducer(state = chatsState, action) {
  switch(action.type){
    case FETCHING_CHAT:
      return {...state, isLoading: true}
    case FETCHED_CHAT:
      return {...state, isLoading: false, chatroom: action.payload}
    case SENT_MESSAGE:
      return {...state, chatroom: action.payload}
    case "SIGN_OUT":
      return {state: chatsState }
    case SHOW_CHAT:
      return {...state, showChat: true}
    default:
      return state
  }
}

export default chatsReducer
