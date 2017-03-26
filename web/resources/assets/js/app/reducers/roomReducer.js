const initialState = {
  rooms: {},
  activeRoom: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default:
      return state;
  }
}