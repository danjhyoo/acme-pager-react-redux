import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

const GET_EMPLOYEES = "GET_EMPLOYEES";
const initialState = {
  count: 0,
  rows: [],
};
const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return action.employees;
  }
  return state;
};

const reducer = combineReducers({
  employees: employeesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

const _getEmployees = (employees) => ({ type: GET_EMPLOYEES, employees });

const getEmployees = (pageNum) => {
  return async (dispatch) => {
    const employees = (await axios.get(`/api/employees/${pageNum}`)).data;
    return dispatch(_getEmployees(employees));
  };
};

export default store;

export { getEmployees };
