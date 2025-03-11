import { StyleSheet, TextInput, View } from "react-native";
import HighlightedMovie from "../../../components/highlightedmovie";
import MoviesList from "../../../components/movieslist";
import { useState } from "react";

export default function Index() {
  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container}>
      {/* <HighlightedMovie></HighlightedMovie> */}
      <TextInput
        placeholder="Buscar um filme"
        placeholderTextColor={"#d9d9d9"}
        style={styles.search}
        onChangeText={(textSearch) => setSearch(textSearch)}
        defaultValue={search}
      />
      <MoviesList search={search} />
    </View>
  );
}

const borderRadius = 45 / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    gap: 20,
    backgroundColor: "#111",
  },
  search: {
    marginTop: 20,
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 50 / 2,
    backgroundColor: "#232323",
    color: "#fff",
  },
});
