// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { HistoryScreen, HomeScreen } from "./src/screens/index";

import { store } from "./redux/store";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "History") {
                iconName = "history";
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            animationEnabled: true,
            swipeEnabled: true,
            unmountInactiveRoutes: true
          })}
          tabBarOptions={{
            activeTintColor: "#00BFFF",
            inactiveTintColor: "#ffffff",
            style: {
              paddingVertical: 10,
              backgroundColor: "black",
              border: "#ffffff",
            },
            swipeEnabled: true,
            animationEnabled: true
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "" }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: "" }}
          />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
