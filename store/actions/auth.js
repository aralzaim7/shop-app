export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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

      dispatch({
        type: SIGNUP,
        token: resData.idToken,
        userId: resData.localId,
      });
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

      //console.log(resData);

      dispatch({
        type: LOGIN,
        token: resData.idToken,
        userId: resData.localId,
      });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};
