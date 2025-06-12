import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../assets/theme/colors";
import MoviesList from "../../../components/movieslist";
import useFilms from "../../../hooks/useFilms";
import { useCallback, useEffect, useState } from "react";
import { getFilms } from "../../../database/dbHistory";
import { useFocusEffect } from "expo-router";

export default function History() {
  const { getFilmsById } = useFilms;
  const [history, setHistory] = useState<any>([]);
  const [films, setFilms] = useState<any>([]);

  const getHistory = async () => {
    const allFilms = await getFilms();
    setHistory(allFilms);
  };

  const getFilmsFromHistory = async () => {
    setFilms([]); // limpa a lista antes
    for (const savedFilm of history) {
      const lastFilm = await getFilmsById(savedFilm.film_id);
      setFilms((prev) => [...prev, lastFilm]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getHistory();
    }, [])
  );

  useEffect(() => {
    getFilmsFromHistory();
  }, [history]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      <MoviesList films={films} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPage,
    height: "100%",
    padding: 20,
    gap: 20,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
});
