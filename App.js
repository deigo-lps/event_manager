import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { EventsContextProvider } from "./store/events-context";
import { NavigationContainer } from "@react-navigation/native";
import Book from "./screens/Book";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Manager from "./screens/Manager";
import HomeIcon from "./icons/HomeIcon";
import Config from "./icons/Config";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator headerShown={false}>
        <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Book" component={Book} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  return (
    <EventsContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => {
              if (route.name === "Home") {
                return focused ? <HomeIcon width="20" height="20" fill="#fc8f94" /> : <HomeIcon width="20" height="20" fill="#818393"  />;
              } else if (route.name === "Manager") {
                return focused ? <Config width="20" height="20" fill="#fc8f94"  /> : <Config width="20" height="20" fill="#818393"  />;
              }
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Manager" component={Manager} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </EventsContextProvider>
  );
}
