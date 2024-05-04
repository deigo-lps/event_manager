import Home from "./screens/Home";
import { EventsContextProvider } from "./store/events-context";

export default function App() {
  return (
    <EventsContextProvider>
      <Home/>
    </EventsContextProvider>
  );
}
