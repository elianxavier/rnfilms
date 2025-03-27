import { StyleSheet } from "react-native";
import colors from "./colors";

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

  export default styles;