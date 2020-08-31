import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Card, CardItem, Body } from "native-base";

export default function Item({ current }) {
  return current.map((el) => {
    return (
      <ScrollView key={el.key}>
        <Card dataArray={el.data}>
          <CardItem bordered>
            <Body>
              <View style={styles.horizontal}>
                <Text style={styles.emptyText}>{el.data}</Text>
                <FontAwesome name="check-square-o" size={24} color="green" />
              </View>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    );
  });
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  emptyText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginHorizontal: 10,
  },
});
