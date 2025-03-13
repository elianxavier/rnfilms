import { useLocalSearchParams } from "expo-router";
import { BASE_URL, API_TOKEN } from "@env";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
      <Image
        style={styles.banner}
        source={{
          uri: `https://image.tmdb.org/t/p/original${film?.poster_path}`,
        }}
      />

      <View>
        <Text style={styles.text}>Título</Text>
        <Text style={styles.text}>{film?.title}</Text>
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
        {/* <StarVote vote_value={5} /> */}
        <Text style={styles.text}>{film?.vote_average}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
  },
  banner: {
    height: 300,
    width: 200,
  },
  text: {
    color: "white",
  },
});
