
// USER ACTIONS

import UserApi from '../services/userApi'

import { push } from 'react-router-redux'

export const LOGGING_IN_USER = "LOGGING_IN_USER"
export const LOGGING_IN_USER_SUCCESS = "LOGGING_IN_USER_SUCCESS"
export const SET_USER = "SET_USER"
export const CREATING_USER = "CREATING_USER"
export const CREATED_USER_SUCCESS = "CREATED_USER_SUCCESS"
export const SELECTED_USER = "SELECTED_USER"
export const REQUEST_FRIENDSHIP = "REQUEST_FRIENDSHIP"
export const REQUESTED_FRIENDSHIP = "REQUESTED_FRIENDSHIP"
export const VIEW_FRIEND_REQUESTS = "VIEW_FRIEND_REQUESTS"
export const RECEIVED_FRIEND_REQUESTS = "RECEIVED_FRIEND_REQUESTS"
export const POSTIVE_RESPONSE_FRIEND_REQUEST = "POSTIVE_RESPONSE_FRIEND_REQUEST"
export const COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST = "COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST"
export const FETCHING_FRIENDS = "FETCHING_FRIENDS"
export const FETCHED_FRIENDS = "FETCHED_FRIENDS"
export const FETCHING_PROFILE = "FETCHING_PROFILE"
export const FETCHED_PROFILE = "FETCHED_PROFILE"
export const ERRORS = "ERRORS"
export const SIGN_OUT = "SIGN_OUT"
export const EDITING_USER = "EDITING_USER"
export const EDITED_USER = "EDITED_USER"
export const SHOW_FRIEND_ON_MAP = "SHOW_FRIEND_ON_MAP"
export const RENDER_SIGN_UP_PAGE = "RENDER_SIGN_UP_PAGE"
export const FETCHED_PAST_TRIPS = "FETCHED_PAST_TRIPS"
export const CHANGE_USER_LOCATION = "CHANGE_USER_LOCATION"
export const RENDER_ADD_BIO_PAGE = "RENDER_ADD_BIO_PAGE"

// ASK ABOUT THIS ONE
export const RETURN_TO_FRIENDS_MENU = "RETURN_TO_FRIENDS_MENU"

// THESE DO NOT NEED THUNK BUT I NEED TO USE DISPATCH
export function returnToFriendsMenu() {
  return function(dispatch){
    dispatch({type: "RETURN_TO_FRIENDS_MENU"})
    dispatch(push('/friends'))
  }
}

export function renderSignUpPage() {
  return function(dispatch){
    dispatch({type: "RENDER_SIGN_UP_PAGE"})
    dispatch(push('/signup'))
  }
}

export function renderAddBioPage() {
  return function(dispatch){
    dispatch({type: "RENDER_ADD_BIO_PAGE"})
    dispatch(push('/addbio'))
  }
}

export function selectUser(id) {
  return function(dispatch){
    // dispatch({type: "SELECTED_USER", payload: user})
    dispatch(push(`/users/${id}`))
  }
}

export function dispatchCurrentUser() {
  return function(dispatch){
    UserApi.fetchCurrentUser().then(json => {
      dispatch({type: "SET_USER", payload: json})
      UserApi.fetchFriends(json).then(friendsJSON => {
        dispatch({type: "FETCHED_FRIENDS", payload: friendsJSON.friends})
        dispatch({type: "FETCHED_PAST_TRIPS", payload: friendsJSON.past_trips})
      })
    })
  }
}

export function showFriendOnMap(lat, lng) {
  return function(dispatch){
    dispatch({type: "SHOW_FRIEND_ON_MAP", payload: {lat, lng} })
    // dispatch(push(`/friends/${lat, lng}`))
    dispatch(push(({
      pathname: '/friends',
      search: `?query=${lat}`,
      state: { detail: {lat, lng} }
    })))
  }
}

export function changeUserLocation(currentUser, lat, lng){
  return function(dispatch){
    dispatch({type: "CHANGE_USER_LOCATION"})
    UserApi.editUserLocation(currentUser, lat, lng).then(userJSON => {
      dispatch({type: "FOUND_USER", payload: userJSON})
    })
    .then(dispatch(push(`/trips`)))
  }
}

export function fetchProfile(currentUser, id){
  return function(dispatch){
    dispatch({type: "FETCHING_PROFILE"})
    UserApi.fetchProfile(currentUser, id).then(userInfoJSON => {
      dispatch({type: "FETCHED_PROFILE", payload: userInfoJSON})
    })
  }
}

export function fetchFriends(currentUser) {
  return function(dispatch){
    dispatch({type: "FETCHING_FRIENDS"})
    UserApi.fetchFriends(currentUser).then(friendsJSON => {
      dispatch({type: "FETCHED_FRIENDS", payload: friendsJSON.friends})
      dispatch({type: "FETCHED_PAST_TRIPS", payload: friendsJSON.past_trips})
    })
  }
}

export function positiveResponseFriendRequest(user, friend){
  return function(dispatch){
    dispatch({type: "POSTIVE_RESPONSE_FRIEND_REQUEST"})
    UserApi.positiveResponseFriendRequest(user, friend).then(friendsJSON => {
    dispatch({type: "COMPLETED_POSTIVE_RESPONSE_FRIEND_REQUEST"})
    })
  }
}

export function createUser(username, password, passwordConfirmation, location) {
  return function(dispatch){
    console.log('in creating user');
     dispatch({type: "CREATING_USER"})
     UserApi.createUser(username, password, passwordConfirmation, location)
     .then(userJSON => {
       console.log('json', userJSON)
       if (userJSON.errors) {
         console.log(userJSON)
         dispatch({type: "SIGN_UP_ERROR", errors: userJSON})
       } else {
         console.log('success')
         localStorage.setItem("token", userJSON.auth_token)
         dispatch({type: "CREATED_USER_SUCCESS", payload: userJSON.user})
       }
     })
     }
   }

export function editUser(currentUser, username, bio, photoUrl){
  return function(dispatch){
    dispatch({type: "EDITING_USER"})
    UserApi.editProfile(currentUser, username, bio, photoUrl).then(userJSON => {
      if (userJSON.error){
        dispatch({type: "ERRORS", payload: userJSON.error})
      } else {
        dispatch({type: "EDITED_USER", payload: userJSON})
        dispatch(push(`/users/${currentUser.id}`))
      }
    })
  }
}

export function addBio(currentUser, bio, photoUrl) {
  return function(dispatch){
    dispatch({type: "EDITING_USER"})
    UserApi.addBio(currentUser, bio, photoUrl).then(userJSON => {
      if (userJSON.error){
        dispatch({type: "ERRORS", payload: userJSON.error})
      } else {
        dispatch({type: "EDITED_USER", payload: userJSON})
      }
    })
    .then(dispatch(push(`/welcome`)))
  }
}

export function login(username, password) {
  return function(dispatch){
    dispatch({type: "LOGGING_IN_USER"})
    UserApi.login(username, password).then(userJSON => {
      if (userJSON.error) {
        dispatch({type: "ADD_ERROR", errors: userJSON.error})
      } else {
        localStorage.setItem("token", userJSON.auth_token);
        dispatch({type: "LOGGING_IN_USER_SUCCESS", payload: userJSON.user})
        dispatch(push('/welcome'))
      }
    })
  }
}

export function requestFriendship(currentUserId, addFriend) {
  return function(dispatch){
    dispatch({type: "REQUEST_FRIENDSHIP"})
    UserApi.requestFriendship(currentUserId, addFriend).then(responseJSON => {
      dispatch({type: "REQUESTED_FRIENDSHIP", payload: responseJSON.message})
    })
  }
}

export function viewFriendRequests(currentUser) {
  return function(dispatch){
    dispatch({type: "VIEW_FRIEND_REQUESTS"})
    UserApi.viewFriendRequests(currentUser).then(responseJSON => {
      dispatch({type: "RECEIVED_FRIEND_REQUESTS", payload: responseJSON})
    })
  }
}

export function signOut() {
  return function(dispatch){
    dispatch({type: "SIGN_OUT"})
    UserApi.signOut()
    dispatch(push('/'))
  }
}
