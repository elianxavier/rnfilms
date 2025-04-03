import { Stack } from "expo-router/stack";
import colors from "../../assets/theme/colors";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.backgroundPage,
          },
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: "Detalhes do Filme",
          headerStyle: {
            backgroundColor: colors.backgroundPage,
          },
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: colors.backgroundPage,
          },
        }}
      />
    </Stack>
  );
}
