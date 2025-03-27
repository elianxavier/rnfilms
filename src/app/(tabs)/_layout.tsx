import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={28} icon={faHome} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="raffleone"
        options={{
          title: "Sortear",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={28} icon={faHome} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="multiplyraffle"
        options={{
          title: "Aleatório",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={28} icon={faHome} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
