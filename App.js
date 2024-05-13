import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { EventsContextProvider } from "./store/events-context";
import { NavigationContainer } from "@react-navigation/native";
import Book from "./screens/Book";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Manager from "./screens/Manager";
import HomeIcon from "./icons/HomeIcon";
import Config from "./icons/Config";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HandleEvent from "./screens/HandleEvent";
import Bookings from "./screens/Bookings";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator headerShown={false}>
        <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Book" component={Book} options={{ headerShown: false }} />
        <Stack.Screen name="Bookings" component={Bookings} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  const ManagerStack = () => {
    return (
      <Stack.Navigator headerShown={false}>
        <Stack.Screen name="Manager" component={Manager} options={{ headerShown: false }} />
        <Stack.Screen name="Update" component={HandleEvent} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") {
              return focused ? <HomeIcon width="20" height="20" fill="#fc8f94" /> : <HomeIcon width="20" height="20" fill="#818393" />;
            } else if (route.name === "ManagerStack") {
              return focused ? <Config width="20" height="20" fill="#fc8f94" /> : <Config width="20" height="20" fill="#818393" />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="ManagerStack" component={ManagerStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  };

  return (
    <EventsContextProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Main Navigation">
          <Drawer.Screen name="Main Navigation" component={Tabs} />
          <Drawer.Screen name="Create Event" component={HandleEvent} />
        </Drawer.Navigator>
      </NavigationContainer>
    </EventsContextProvider>
  );
}
