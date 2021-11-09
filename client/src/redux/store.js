import { createStore, combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
const reducer = (state = {}, action) => state;

const rootReducer = combineReducers({
  getCollections: fetchReducer,
});
const store = createStore(rootReducer);

export default store;
