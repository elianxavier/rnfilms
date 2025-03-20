import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { BASE_URL, API_TOKEN } from "@env";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import colors from "../assets/theme/colors";

export default function MoviesList(props: { search: string }) {
  const [films, setFilms] = useState<any>([]);

  const getFilms = async () => {
    const typeSearch = props.search == "" ? "discover" : "search";

    const params = {
      language: "pt-br",
      api_key: `${process.env.API_KEY}`,
      include_adult: "false",
      ...(typeSearch === "search" && { query: props.search }),
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
        setFilms(data.results);
      });
  };

  useEffect(() => {
    getFilms();
  }, []);

  useEffect(() => {
    getFilms();
  }, [props.search]);

  return (
    <ScrollView style={styles.list}>
      <View style={{ gap: 10 }}>
        {films.map((film: any) => (
          <Link
            push
            key={film.id}
            href={{
              pathname: "/movie/[id]",
              params: { id: film.id },
            }}
          >
            <View style={styles.film}>
              <Image
                style={styles.banner}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${film.poster_path}`,
                }}
              />
              <View style={styles.details}>
                <Text style={styles.title}>{film.title}</Text>
                <Text style={styles.description}>{film.overview}</Text>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  film: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    backgroundColor: colors.backgroundCard,
    borderRadius: 10,
  },
  banner: {
    height: 100,
    width: 66.6,
    borderRadius: 7,
  },
  details: {
    flex: 1,
    height: 100,
    maxHeight: 100,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#d9d9d9",
  },
});
