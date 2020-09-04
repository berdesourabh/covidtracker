export const initialState = {
  user: {
    userName: "abc123@gmail.com",
    firstName: null,
    lastName: null,
    jwtToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxMjNAZ21haWwuY29tIiwiaWF0IjoxNTk5MjE2MTMyLCJleHAiOjE1OTkyMTk3MzJ9.NcBmRjt2naSsNdU4wRi75eQSNpmSwhGEtHK1b0aKPNs",
    authorities: [
      {
        authority: "ROLE_USER",
      },
    ],
  },
};

export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_USER: "ADD_USER",
};

const reducer = (state, action) => {
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
    default:
      return state;
  }
};

export default reducer;
