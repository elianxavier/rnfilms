import { useLocalSearchParams } from "expo-router";
import { BASE_URL, API_TOKEN } from "@env";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import StarVote from "../../../components/starvote";
import colors from "../../../assets/theme/colors";

export default function Movie() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [film, setFilm] = useState<any>();

  const getFilms = async () => {
    fetch(
      `${process.env.BASE_URL}/movie/${id}?` +
        new URLSearchParams({
          language: "pt-br",
          api_key: `${process.env.API_KEY}`,
        }).toString(),
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
        console.log(data.runtime);
        const minutes: number = data.runtime % 60;
        const hours: number = (data.runtime - minutes) / 60;
        data.runtime =
          hours + (hours != 1 ? " horas " : " hora ") + minutes + " minutos";
        console.log(data.run_time);
        setFilm(data);
      });
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.banner}
          source={{
            uri: `https://image.tmdb.org/t/p/original${film?.backdrop_path}`,
          }}
        />
        <View>
          <Text style={styles.title}>{film?.title}</Text>
          <StarVote vote_value={5} />
        </View>
      </View>

      <View>
        <Text style={styles.text}>Gêneros</Text>
        {film?.genres.map((genre: any) => (
          <Text style={styles.text} key={genre.id}>
            {genre.name}
          </Text>
        ))}
      </View>

      <View>
        <Text style={styles.text}>Resumo</Text>
        <Text style={styles.text}>{film?.overview}</Text>
      </View>

      <View>
        <Text style={styles.text}>Nota</Text>

        <Text style={styles.text}>{film?.vote_average}</Text>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    alignItems: "center",
  },
  header: {
    position: "relative",
  },
  banner: {
    height: (windowWidth / 2) * 3,
    width: windowWidth,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 15,
    left: 15,
  },
  text: {
    color: "white",
  },
});
