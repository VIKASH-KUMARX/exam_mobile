import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Joke {
  setup: string;
  punchline: string;
  id?: number;
}

export default function App() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((res) => setJoke(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Joke</Text>
      {joke ? (
        <>
          <Text style={styles.text}>{joke.setup}</Text>
          <Text style={styles.text}>{joke.punchline}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginTop: 5 },
});