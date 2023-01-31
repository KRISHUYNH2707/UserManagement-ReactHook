import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
    userReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// SHALLOW COMPARE ( === ) ( so sánh địa chỉ vùng nhớ )
// oldState và newState => oldState === newState

// var object = {
//   a: {
//     b: {
//       c: {
//         d: 1
//       }
//     }
//   }
// }

// SHALLOW COMPARE vs DEEP COMPARE ( so sanh địa chỉ vùng nhớ và so sánh lun giá trị bên trog địa chỉ vùng nhớ )
