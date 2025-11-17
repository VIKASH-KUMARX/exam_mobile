import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExamDetail() {
  const { code, name, date, session, hall } = useLocalSearchParams();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
        
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exam Details</Text>
        <Text style={styles.headerSubtitle}>{name}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Course Code</Text>
          <Text style={styles.value}>{code}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Course Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Session</Text>
          <Text style={styles.value}>{session}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Hall</Text>
          <Text style={styles.value}>{hall}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FA",
  },

  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 30,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginBottom: 25,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "#E8ECF8",
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  row: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingBottom: 12,
  },

  label: {
    fontSize: 15,
    color: "#555",
    fontWeight: "700",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
});