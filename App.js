import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { EventsContextProvider } from "./store/events-context";
import { NavigationContainer } from "@react-navigation/native";
import Book from "./screens/Book";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <EventsContextProvider>
      <NavigationContainer>
        <Stack.Navigator headerShown={false}>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Book" component={Book} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </EventsContextProvider>
  );
}
