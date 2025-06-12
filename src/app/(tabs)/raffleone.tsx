import { faShuffle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import colors from "../../../assets/theme/colors";
import useFilms from "../../../hooks/useFilms";
import { Link } from "expo-router";
import { saveOnHistory } from "../../../database/dbHistory";

export default function RuffleOne() {
  const { getFilms } = useFilms;
  const [film, setFilm] = useState<any>({});
  const [enabledSearch, setEnabledSearch] = useState<boolean>(true);

  const handleGetFilm = async () => {
    if (enabledSearch) {
      const filmNumber = shuffleNumber(1, 2000);
      const result = await getFilms("", filmNumber);
      setFilm(result);
      setEnabledSearch(false);
      Vibration.vibrate(100);
      saveOnHistory(result.id);

      setTimeout(() => {
        setEnabledSearch(true);
      }, 600);
    }
  };

  function shuffleNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Link
          push
          key={film?.id}
          href={{
            pathname: "/movie/[id]",
            params: { id: film?.id },
          }}
        >
          <Image
            style={styles.banner}
            source={{
              uri: `https://image.tmdb.org/t/p/original${film?.backdrop_path}`,
            }}
          />
        </Link>

        <Text style={styles.title}>{film?.title}</Text>

        <ScrollView>
          <View style={styles.infoBox}>
            {film?.vote_average !== undefined && (
              <View style={styles.vote}>
                <FontAwesomeIcon icon={faStar} color="yellow" size={20} />
                <Text style={styles.voteText}>
                  {film?.vote_average?.toFixed(1) || "--"}/10
                </Text>
              </View>
            )}

            <Text style={styles.infoText}>{film?.overview}</Text>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={enabledSearch ? styles.button : styles.inactiveButton}
        onPress={() => {
          handleGetFilm();
        }}
      >
        <FontAwesomeIcon
          icon={faShuffle}
          size={30}
          color={enabledSearch ? "white" : "#444"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPage,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    height: "70%",
    width: "100%",
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  banner: {
    height: 200,
    width: "100%",
    borderRadius: 7,
  },
  infoBox: {
    height: "100%",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
  },
  infoText: {
    color: "white",
    fontSize: 15,
    textAlign: "justify",
  },
  vote: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  voteText: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  inactiveButton: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 10,
  },
});
