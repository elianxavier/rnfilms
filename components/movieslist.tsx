import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { BASE_URL, API_TOKEN } from "@env";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "expo-router";
import styles from "../assets/theme/movieslist";

export default function MoviesList(props: { films: any }) {
  return (
    <ScrollView style={styles.list}>
      <View style={{ gap: 10 }}>
        {props.films.map((film: any) => (
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
