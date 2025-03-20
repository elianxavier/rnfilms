import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Text } from "react-native";

export default function StarVote(props: { vote_value: number }) {
  const renderStars = (vote_value: number) => {
    const stars = [];

    for (let i = 1; i < 5; i++) {
      stars.push();
    }
  };

  return (
    <Text>
      ()
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
    </Text>
  );
}
