import { useLocalSearchParams } from "expo-router";
// import { BASE_URL, API_TOKEN } from "@env";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../assets/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../../assets/theme/movie";

export default function Movie() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [film, setFilm] = useState<any>();

  const convertFromMinutes = (total: number) => {
    const minutes: number = total % 60;
    const hours: number = (total - minutes) / 60;

    if (hours < 1) {
      return minutes + " minutos";
    }

    return hours + (hours != 1 ? " horas " : " hora ") + minutes + " minutos";
  };

  const getFilms = async () => {
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/movie/${id}?` +
        new URLSearchParams({
          language: "pt-br",
          api_key: `${process.env.EXPO_PUBLIC_API_KEY}`,
        }).toString(),
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
        setFilm(data);
      });
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.banner}
            source={{
              uri: `https://image.tmdb.org/t/p/original${film?.backdrop_path}`,
            }}
          />
          <LinearGradient
            colors={["transparent", colors.backgroundPage]}
            style={styles.mainInfo}
          >
            <Text style={styles.title}>{film?.title}</Text>

            <View style={styles.vote}>
              <FontAwesomeIcon icon={faStar} color="yellow" size={20} />
              <Text style={styles.voteText}>
                {film?.vote_average.toFixed(1)}/10
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.main}>
          <View style={{ gap: 5 }}>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Gêneros</Text>
              {film?.genres.map((genre: any, index: number) => (
                <Text style={styles.infoText} key={genre.id}>
                  {genre.name}
                  {index + 1 == film?.genres.length ? "" : ","}
                </Text>
              ))}
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTitle}>Duração</Text>
              <Text style={styles.infoText}>
                {convertFromMinutes(film?.runtime)}
              </Text>
            </View>
          </View>

          <View style={styles.synopsis}>
            <Text style={styles.infoTitle}>Sinopse</Text>
            <Text style={styles.infoText}>{film?.overview}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
