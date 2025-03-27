import { StyleSheet, TextInput, View } from "react-native";
import HighlightedMovie from "../../../components/highlightedmovie";
import MoviesList from "../../../components/movieslist";
import { useCallback, useEffect, useState } from "react";
import colors from "../../../assets/theme/colors";
import debounce from "lodash.debounce";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [films, setFilms] = useState<any>([]);

  const debouncedGetFilms = useCallback(
    debounce((textSearch: string) => getFilms(textSearch), 500),
    []
  );

  const handleSearchChange = (textSearch: string) => {
    setSearch(textSearch);
    debouncedGetFilms(textSearch);
  };

  const getFilms = async (query: string) => {
    const typeSearch = query == "" ? "discover" : "search";

    const params = {
      language: "pt-br",
      api_key: `${process.env.API_KEY}`,
      include_adult: "false",
      ...(typeSearch === "search" && { query: query }),
    };

    fetch(
      `${process.env.BASE_URL}/${typeSearch}/movie?` +
        new URLSearchParams(params).toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setFilms(
          data.results.filter((result: { overview: string }) => {
            return result.overview != "";
          })
        );
      });
  };

  useEffect(() => {
    getFilms("");
  }, []);

  return (
    <View style={styles.container}>
      {/* <HighlightedMovie></HighlightedMovie> */}
      <TextInput
        placeholder="Buscar um filme"
        placeholderTextColor={"#d9d9d9"}
        style={styles.search}
        onChangeText={handleSearchChange}
        defaultValue={search}
      />
      <MoviesList films={films} />
    </View>
  );
}

const borderRadius = 45 / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    gap: 20,
    backgroundColor: colors.backgroundPage,
  },
  search: {
    marginTop: 20,
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 50 / 2,
    backgroundColor: colors.backgroundCard,
    color: "#fff",
  },
});
