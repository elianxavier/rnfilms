import { StyleSheet, Text, View } from "react-native";
import colors from "../../../assets/theme/colors";

export default function MultiplyRuffle() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Em breve</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPage,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#555", fontSize: 30 },
});
