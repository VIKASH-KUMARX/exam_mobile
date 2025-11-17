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

export default function SeatAllocation() {
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

  const { API } = useLocalSearchParams();
  const BASE_URL = "https://examease.org/api";

  const [studentData, setStudentData] = useState<StudentData>({
    regnum: "",
    name: "",
    roomno: "",
    courses: "",
  });

  const [examData, setExamData] = useState<ExamData[]>([]);
  const [filteredExamData, setFilteredExamData] = useState<ExamData[]>([]);

  useEffect(() => {
    axios.get(`${API}`).then((res) => setStudentData(res.data));
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/course`).then((res) => setExamData(res.data));
  }, []);

  useEffect(() => {
    if (studentData.courses && examData.length > 0) {
      const studentCourses = Array.isArray(studentData.courses)
        ? studentData.courses
        : studentData.courses.split(",");

      const filtered = examData.filter((exam) =>
        studentCourses.includes(exam.coursecode)
      );

      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime())
          return dateA.getTime() - dateB.getTime();
        return a.session === "FN" ? -1 : 1;
      });

      setFilteredExamData(sorted);
    }
  }, [studentData, examData]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seat Allocation</Text>
        <Text style={styles.headerSubtitle}>
          View all your exam schedules & assigned halls
        </Text>
      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHead}>
        <Text style={[styles.headCell, { flex: 0.6 }]}>S.No</Text>
        <Text style={styles.headCell}>Code</Text>
        <Text style={[styles.headCell, { flex: 1.6 }]}>Course</Text>
        <Text style={styles.headCell}>Date</Text>
        <Text style={[styles.headCell, { flex: 0.7 }]}>Session</Text>
        <Text style={styles.headCell}>Hall</Text>
      </View>

      {/* TABLE DATA */}
      {filteredExamData.map((data, index) => {
        const roomList = studentData.roomno
          ? studentData.roomno.split(",").map((r) => r.trim())
          : [];
        const currentRoom = roomList[index] || "Not Allocated";

        return (
          <Link
            key={index}
            href={{
              pathname: "/StudentMain/exam/[code]",
              params: {
                code: data.coursecode,
                name: data.coursename,
                date: data.date,
                session: data.session,
                hall: currentRoom,
              },
            }}
            asChild
          >
            <TouchableOpacity>
              <View
                style={[
                  styles.tableRow,
                  index % 2 !== 0 && styles.tableRowAlt,
                ]}
              >
                <Text style={[styles.cell, { flex: 0.6 }]}>{index + 1}</Text>
                <Text style={styles.cell}>{data.coursecode}</Text>
                <Text style={[styles.cell, { flex: 1.6 }]}>
                  {data.coursename}
                </Text>
                <Text style={styles.cell}>{data.date}</Text>
                <Text style={[styles.cell, { flex: 0.7 }]}>
                  {data.session}
                </Text>
                <Text style={styles.cell}>{currentRoom}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FA",
  },

  /* HEADER */
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 32,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginBottom: 22,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "#E8ECF8",
    fontSize: 15,
    fontWeight: "500",
  },

  /* TABLE HEAD */
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#E8EFFC",
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginHorizontal: 14,
    borderBottomWidth: 1.5,
    borderColor: "#C9D8F2",
  },
  headCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 13,
    color: "#2B4C8C",
  },

  /* TABLE ROWS */
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#E1E5EE",
  },
  tableRowAlt: {
    backgroundColor: "#F8FAFF",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13.5,
    fontWeight: "600",
    color: "#333",
  },
});
