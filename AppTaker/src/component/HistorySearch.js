import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 
import { Card, CardItem, Body } from "native-base";
import { isEmpty } from "lodash";


function Item({ history }) {
  return history.map((el) => {
    console.log(el)
    return (
      <ScrollView key={el.input}>
        <Card dataArray={el.data}>
          <CardItem bordered>
            <Body>
              <View style={styles.horizontal}>
              <Text style={styles.emptyText}>{el.input}</Text>
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

export default function HistorySearch() {
  const { history } = useSelector((state) => state);
  console.log(history);

  const renderHistory = () => {
    return (
      <Item history={history}/>
    );
  };

  const renderIsEmpty = () => {
    return (
      <View style={styles.horizontal}>
        <Text style={styles.emptyText}>No history available</Text>
        <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color="black" />
      </View>
    );
  };

  return (
      <View>
        {isEmpty(history) ? renderIsEmpty() : renderHistory()}
      </View>
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
    marginHorizontal: 5
  },
});
