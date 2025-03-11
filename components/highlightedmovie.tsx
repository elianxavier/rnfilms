import { StyleSheet, Text, View } from "react-native";

export default function HighlightedMovie() {
  return <View style={styles.movie}></View>;
}

const styles = StyleSheet.create({
  movie: {
    height: 150,
    backgroundColor: "#232323",
  },
});
