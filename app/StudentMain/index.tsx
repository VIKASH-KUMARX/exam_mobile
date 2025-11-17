import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function StudentDashboard() {
  interface StudentData {
    regnum: string;
    name: string;
    roomno: string;
    courses: string;
  }

  interface ExamData {
    coursecode: string;
    coursename: string;
    date: string;
    session: string;
  }

  const BASE_URL = 'https://examease.org/api';
  const { API } = useLocalSearchParams();

  const [studentData, setStudentData] = useState<StudentData>({
    regnum: "",
    name: "",
    roomno: "",
    courses: "",
  });
  const [examData, setExamData] = useState<ExamData[]>([]);
  const [totalExams, setTotalExams] = useState(0)

  useEffect(() => {
    axios
      .get(`${API}`)
      .then((res) => setStudentData(res.data))
      .catch((err) => console.error("Error in student data fetch:", err));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/course`).then((res) => setExamData(res.data));
  }, []);

  const studentYear = String(studentData.regnum || "").substring(4, 6);
  const Batch = `20${studentYear} - 20${parseInt(studentYear) + 4}`;

  useEffect(() => {
    if (studentData.courses && examData.length > 0) {
      const studentCourses = Array.isArray(studentData.courses)
        ? studentData.courses
        : studentData.courses.split(",");

      const filtered = examData.filter((exam) =>
        studentCourses.includes(exam.coursecode)
      );
      setTotalExams(filtered.length);
    }
  }, [studentData, examData])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.topHeader}>
        
        <View style={styles.headerRow}>
          <Text style={styles.topHeaderTitle}>Student Dashboard</Text>

          <Link href="/" asChild>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.topHeaderSubtitle}>
          Welcome, {studentData.name ? studentData.name.toUpperCase() : "Student"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Overview</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {studentData.name ? studentData.name.toUpperCase() : "-"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Register Number</Text>
          <Text style={styles.value}>{studentData.regnum || "-"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Degree</Text>
          <Text style={styles.value}>BE - ECE</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Batch</Text>
          <Text style={styles.value}>{Batch}</Text>
        </View>

        <View style={styles.infoRowLast}>
          <Text style={styles.label}>Total Exams</Text>
          <Text style={styles.value}>{totalExams || "-"}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>View</Text>

      <View style={styles.actionCardContainer}>
        <Link
          href={{
            pathname: "/StudentMain/seat-allocation",
            params: { API },
          }}
          asChild
        >
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionCardText}>Seat Allocation</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Text style={styles.footerText}>All your academic details in one place.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FA",
  },

  topHeader: {
    backgroundColor: "#007AFF",
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 25,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topHeaderTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "800",
  },

  logoutButton: {
  backgroundColor: "red",
  opacity: 0.8,
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 12,
  },

  logoutText: {
  color: "#FFF",
  fontSize: 15,
  fontWeight: "700",
  },

  topHeaderSubtitle: {
    color: "#E8ECF8",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  infoRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },

  value: {
    fontSize: 15,
    color: "#222",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 12,
    color: "#444",
  },

  actionCardContainer: {
    paddingHorizontal: 16,
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,

    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
  },

  actionCardText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#007AFF",
  },

  arrow: {
    fontSize: 30,
    color: "#007AFF",
    fontWeight: "300",
  },

  footerText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    paddingVertical: 25,
  },
});