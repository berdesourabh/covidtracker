// export const initialState = {
//   user: {
//     userName: "abc123@gmail.com",
//     firstName: null,
//     lastName: null,
//     jwtToken:
//       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxMjNAZ21haWwuY29tIiwiaWF0IjoxNTk5MjQxNTA3LCJleHAiOjE1OTkyNDUxMDd9.3httIycsZIr6GYypH451INMGgUHC5-BPAsCP8XV3y0k",
//     authorities: [
//       {
//         authority: "ROLE_USER",
//       },
//     ],
//   },
// };
export const initialState = {
  user: {},
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
