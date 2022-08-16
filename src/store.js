import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userListReducer } from "./reducers";

const reducers = combineReducers({
  userList: userListReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
