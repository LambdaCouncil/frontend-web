import * as actionTypes from './types';

//Users

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  }
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
};

// Channels

export const setCurrentChannel = channel => ({
  type: actionTypes.SET_CURRENT_CHANNEL,
  payload: {
    currentChannel: channel
  }
});

export const setPrivateChannel = isPrivateChannel => ({
  type: actionTypes.SET_PRIVATE_CHANNEL,
  payload: {
    isPrivateChannel
  }
});