import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import colors from "../../../assets/theme/colors";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundCard,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 25,
          borderStartWidth: 0,
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
          title: "Aleatório",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={28} icon={faHome} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="multiplyraffle"
        options={{
          title: "Sortear",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={28} icon={faHome} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
