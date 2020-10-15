import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmrLh9fNi-0Wf8rXGLoOKqD9LQPhK6kak",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = "Something went wrong!";
        if (errorId == "EMAIL_EXISTS") {
          message = "This email exists already!";
        }
        throw new Error(message);
      }

      const resData = await response.json();

      //console.log(resData);

      dispatch(authenticate(resData.localId, resData.idToken));

      const expirationDate =
        new Date().getTime() + parseInt(resData.expiresIn) * 1000;
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmrLh9fNi-0Wf8rXGLoOKqD9LQPhK6kak",
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = "Something went wrong!";
        if (errorId == "EMAIL_NOT_FOUND") {
          message = "This email could not be found!";
        } else if (errorId == "INVALID_PASSWORD") {
          message = "Password is invalid!";
        }
        throw new Error(message);
      }

      const resData = await response.json();

      console.log(resData);

      dispatch(authenticate(resData.localId, resData.idToken));

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
