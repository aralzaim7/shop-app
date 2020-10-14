import React, {
  useState,
  useLayoutEffect,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import CustomButton from "../../components/UI/CustomButton";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error.message, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Authenticate",
    });
  }, [props.navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <LinearGradient
        colors={[Colors.primaryColor, Colors.accentColor]}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isLoading ? (
              <ActivityIndicator
                size="small"
                style={{ marginVertical: 10 }}
                color={Colors.primaryColor}
              />
            ) : (
              <CustomButton
                style={{
                  backgroundColor: Colors.primaryColor,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                onPress={authHandler}
              >
                <Text>{isSignup ? "Sign Up" : "Login"}</Text>
              </CustomButton>
            )}

            <CustomButton
              style={{
                backgroundColor: Colors.accentColor,
                alignItems: "center",
                marginVertical: 10,
              }}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            >
              <Text>{isSignup ? "Switch to Login" : "Switch to Sign Up"}</Text>
            </CustomButton>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    height: "60%",
    maxHeight: 400,
    padding: 15,
  },
});
export default AuthScreen;
