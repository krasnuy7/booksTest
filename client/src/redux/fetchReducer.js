const fetchReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COLLECTIONS":
      return state + action.payload.arr;

    default:
      return state;
  }
};

export default fetchReducer;
