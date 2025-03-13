import { Text } from "react-native";

export default function StarVote(props: { vote_value: number }) {
  return <Text>{props.vote_value}</Text>;
}
