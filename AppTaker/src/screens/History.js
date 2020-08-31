import * as React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { View, Image, StyleSheet } from "react-native";

import Login from "../component/Login";
import HistorySearch from "../component/HistorySearch";

export default function HistoryScreen() {
  const { user } = useSelector((state) => state);

  return (
    <>
      <Image style={styles.bgImage} source={require("../../login.jpg")} />
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Image style={styles.takerImg} source={require("../../taker.png")} />
        {isEmpty(user) ? <Login /> : <HistorySearch />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({  
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
