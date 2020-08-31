import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import { isEmpty, concat } from "lodash";
import Constants from "expo-constants";

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { updateCurrent, updateHistory } from "../../redux/actions";

import Item from './Item'

export default function Search() {
  const { current, history } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    search: "",
    error: "",
  });

  const updateSearch = (search) => {
    setState((prevstate) => ({
      ...prevstate,
      search: search,
    }));
  };

  const launchSearch = () => {
    if (state.search == "") return;
    fetch(`http://192.168.1.25:3000/search/${state.search}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (isEmpty(responseData)) {
          setState((prevstate) => ({
            ...prevstate,
            error: "Product not found",
          }));
        } else {
          console.log("reçu");
          dispatch(updateCurrent(responseData));
          dispatch(
            updateHistory(
              concat(history, [{ input: state.search, ...responseData }])
            )
          );
          setState((prevstate) => ({
            ...prevstate,
            error: "",
          }));
        }
      })
      .done();
  };

  return (
    <>
      <View>
        <SearchBar
          round
          onChangeText={(text) => updateSearch(text)}
          onClearText={(text) => updateSearch(text)}
          icon={{ type: "font-awesome", name: "search" }}
          placeholder="Type Here..."
          value={state.search}
          containerStyle={{
            width: 400,
            alignSelf: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderTopColor: "rgba(0, 0, 0, 0)",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          }}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => launchSearch()}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {!isEmpty(state.error) && (
          <View style={styles.horizontal}>
            <Text style={{ color: "red", ...styles.errorText }}>
              {state.error}
            </Text>
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={24}
              color={"red"}
            />
          </View>
        )}
        {!isEmpty(current) && <Item current={current} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  emptyText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginHorizontal: 10,
  },
  headerText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    fontStyle: "italic",
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
  submitButton: {
    backgroundColor: "#00BFFF",
    padding: 7,
    height: 35,
    width: 70,
    borderRadius: 30,
    alignContent: "center",
    alignSelf: "flex-end",
    marginRight: 17,
  },
  errorText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  submitButtonText: {
    color: "black",
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
