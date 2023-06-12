import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer"
const reducers = combineReducers({ reducer })
const middleware = [thunk]
const store = createStore(reducers, applyMiddleware(...middleware));

export default store;