import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isEmpty } from "lodash";

import { updateUser } from "../../redux/actions";

export default function LoginComponent() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    color: "",
  });

  const handleChange = (e, who) => {
    if (who == "email") {
      setState((prevstate) => ({
        ...prevstate,
        email: e,
      }));
    } else {
      setState((prevstate) => ({
        ...prevstate,
        password: e,
      }));
    }
  };

  const checkLogin = async () => {
    try {
      fetch(`http://192.168.1.25:3000/users/${state.email}/${state.password}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        if (response.status == "220") {
          setState((prevstate) => ({
            ...prevstate,
            color: "green",
            error: response.status + " Authentification sucess",
          }));
          dispatch(
            updateUser({ username: state.email, password: state.password })
          );
        } else {
          setState((prevstate) => ({
            ...prevstate,
            color: "red",
            error: response.status + " Authentification failed",
          }));
        }
      });
    } catch (e) {
      setState((prevstate) => ({
        ...prevstate,
        color: "red",
        error: response.status + " Authentification failed",
      }));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, "email")}
        value={state.email}
        placeholder="Enter your username"
        placeholderTextColor="#000"
        textAlign={"center"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, "pwd")}
        value={state.password}
        placeholder="Enter your password"
        secureTextEntry={true}
        textAlign={"center"}
        placeholderTextColor="#000"
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => checkLogin()}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {!isEmpty(state.error) && (
        <View style={styles.horizontal}>
          <Text style={{ color: state.color, ...styles.errorText }}>
            {state.error}
          </Text>
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={24}
            color={state.color}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#00BFFF",
    borderWidth: 1,
    borderRadius: 30,
    fontWeight: "bold",
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: "#00BFFF",
    padding: 10,
    margin: 15,
    height: 40,
    width: 200,
    borderRadius: 30,
    alignContent: "center",
    alignSelf: "center"
  },
  submitButtonText: {
    color: "black",
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "bold"
  },
  errorText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  takerImg: {
    width: "30%",
    height: "20%",
    alignSelf: "center",
    alignContent: "center",
  },
});
