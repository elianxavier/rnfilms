import { Dimensions, StyleSheet } from "react-native";
import colors from "./colors";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    alignItems: "center",
    minHeight: "100%"
  },
  header: {
    position: "relative",
  },
  banner: {
    height: (windowWidth / 2) * 3,
    width: windowWidth,
  },
  mainInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 15,
    paddingTop: 30,
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
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
  main: {
    padding: 15,
    gap: 20
  },
  info: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
  },
  synopsis: {
    width: "100%",
    gap: 5,
  },
  infoTitle: {
    color: "#999",
    // fontWeight: "bold",
    fontSize: 16
  },
  infoText: {
    color: "white",
    fontSize: 16
  },
});

export default styles;