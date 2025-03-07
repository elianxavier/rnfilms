import { StyleSheet, Text, TextInput, View } from "react-native";
import HighlightedMovie from "../../../components/highlightedmovie";
import MoviesList from "../../../components/movieslist";

export default function Index() {
  return (
    <View style={styles.container}>
      <HighlightedMovie></HighlightedMovie>
      <TextInput placeholder="Teste"></TextInput>
      <MoviesList />
    </View>
  );
}

const borderRadius = 45 / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    gap: 20,
    padding: 10,
  },
});
