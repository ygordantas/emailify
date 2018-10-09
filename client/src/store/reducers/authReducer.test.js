import authReducer from "./authReducer";
import * as actionTypes from "../actions/actionTypes";

describe("Auth reducer", () => {
  it("Should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      _id: null,
      googleID: null,
      facebookID: null,
      credits: 0,
      loading: false,
      error: false
    });
  });
  it("Should update loading to true when auth starts", () => {
    expect(
      authReducer({ loading: false }, { type: actionTypes.AUTH_START })
    ).toEqual({ loading: true });
  });
});
