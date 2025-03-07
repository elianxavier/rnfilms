import { Image, StyleSheet, Text, View } from "react-native";
import { BASE_URL, API_TOKEN } from "@env";
import { useEffect, useState } from "react";

async function consulta() {
  return await fetch(`${process.env.BASE_URL}/movie/12`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      Accept: "application/json",
    },
  }).then((data) => {
    console.log(data);
  });
}

export default function MoviesList() {
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    async function pegarFilmes() {
      const res = await fetch(`${process.env.BASE_URL}/movie/12`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          Accept: "application/json",
        },
      });
      const newData = await res.json();

      setResponse(newData);
      console.log("a");
      console.log(newData);
    }

    pegarFilmes();
  }, []);

  return (
    <View>
      <View>{response}</View>
    </View>
  );
}
