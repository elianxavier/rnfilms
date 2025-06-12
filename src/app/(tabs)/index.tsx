import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HighlightedMovie from "../../../components/highlightedmovie";
import MoviesList from "../../../components/movieslist";
import { useCallback, useEffect, useState } from "react";
import colors from "../../../assets/theme/colors";
import debounce from "lodash.debounce";
import useFilms from "../../../hooks/useFilms";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const { getTrending } = useFilms;
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

  const handleTrendingDefault = async () => {
    getFilms(search);
  };

  const handleTrendingDay = async () => {
    const result = await getTrending("day");
    setFilms(result);
  };

  const handleTrendingWeek = async () => {
    const result = await getTrending("week");
    setFilms(result);
  };

  const getFilms = async (query: string) => {
    const typeSearch = query == "" ? "discover" : "search";

    const params = {
      language: "pt-br",
      api_key: `${process.env.EXPO_PUBLIC_API_KEY}`,
      include_adult: "false",
      ...(typeSearch === "search" && { query: query }),
    };

    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/${typeSearch}/movie?` +
        new URLSearchParams(params).toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
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

      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleTrendingDefault();
          }}
        >
          <Text style={styles.filterButtonText}>Padrão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleTrendingDay();
          }}
        >
          <FontAwesomeIcon icon={faFire} color="yellow" />
          <Text style={styles.filterButtonText}>Dia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleTrendingWeek();
          }}
        >
          <FontAwesomeIcon icon={faFire} color="yellow" />
          <Text style={styles.filterButtonText}>Semana</Text>
        </TouchableOpacity>
      </View>

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
  filters: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    gap: 20,
  },
  filterButton: {
    flexDirection: "row",
    height: 30,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colors.backgroundCard,
    gap: 5,
  },
  filterButtonText: {
    color: "white",
  },
});
