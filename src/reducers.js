const initialState = {
  users: [],
  hasMore: true,
  loading: false,
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LIST_SUCCESS":
      var setHasMore;
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0 ? true : false;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        users:
          state.hasMore !== true
            ? state.users
            : state.users.concat(action.payload),
      };
    case "USER_LIST_CLEANUP":
      return initialState;
    default:
      return state;
  }
};

export { userListReducer };
