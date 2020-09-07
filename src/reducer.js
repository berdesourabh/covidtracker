export const initialState = {
  user: {},
  countryFilter: "",
  stateFilter: "",
  cityFilter: "",
};
export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_USER: "ADD_USER",
  COUNTRY_FILTER: "COUNTRY_FILTER",
  STATE_FILTER: "STATE_FILTER",
  CITY_FILTER: "CITY_FILTER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.COUNTRY_FILTER:
      return {
        ...state,
        countryFilter: action.countryFilter,
      };
    case actionTypes.STATE_FILTER:
      return {
        ...state,
        stateFilter: action.stateFilter,
      };
    case actionTypes.CITY_FILTER:
      return {
        ...state,
        cityFilter: action.cityFilter,
      };
    default:
      return state;
  }
};

export default reducer;
