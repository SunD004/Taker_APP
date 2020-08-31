import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";

import Search from '../component/Search'

export default function HomeScreen() {

  return (
    <>
      <Image style={styles.bgImage} source={require("../../login.jpg")} />
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Image style={styles.takerImg} source={require("../../taker.png")} />
        <Search/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginHorizontal: 10
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
