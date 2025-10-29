import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StudentMain() {
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

  const [studentData, setStudentData] = useState<StudentData>({
    regnum: '',
    name: '',
    roomno: '',
    courses: '',
  });

  const [examData, setExamData] = useState<ExamData[]>([]);
  const [filteredExamData, setFilteredExamData] = useState<ExamData[]>([]);

  const BASE_URL = 'https://exammangement-system.onrender.com';
  const { API } = useLocalSearchParams();

  useEffect(() => {
    axios
      .get(`${API}`)
      .then((res) => setStudentData(res.data))
      .catch((err) => console.error('Error in student data fetch: ', err));
  }, []);

  const studentYear = String(studentData.regnum || '').substring(4, 6);
  const Batch = `20${studentYear} - 20${parseInt(studentYear) + 4}`;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/course`)
      .then((res) => setExamData(res.data))
      .catch((err) => console.error('Error in courses fetch: ', err));
  }, []);

  useEffect(() => {
    if (studentData.courses && examData.length > 0) {
      const studentCourses = Array.isArray(studentData.courses)
        ? studentData.courses
        : studentData.courses.split(',');

      const filtered = examData.filter((exam) =>
        studentCourses.includes(exam.coursecode)
      );

      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime())
          return dateA.getTime() - dateB.getTime();
        return a.session === 'FN' ? -1 : 1;
      });

      setFilteredExamData(sorted);
    }
  }, [studentData, examData]);

  function getDateTimeDiff(d1: Date, d2: Date) {
    let diffMs = Math.abs(+d1 - +d2) + 2 * 60 * 1000;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diffMs / (1000 * 60));
    return `${days}d ${hours}:${minutes}`;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Profile */}
      <View style={styles.profileContainer}>
        <View style={styles.profilePic}>
          <Text style={{ fontSize: 40 }}>👤</Text>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>
            Hey {studentData.name?.toUpperCase()}
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Register number:</Text>
            <Text style={styles.detailValue}>{studentData.regnum}</Text>

            <Text style={styles.detailLabel}>Degree:</Text>
            <Text style={styles.detailValue}>BE-ECE</Text>

            <Text style={styles.detailLabel}>Batch:</Text>
            <Text style={styles.detailValue}>{Batch}</Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seating Allotment</Text>

        {/* Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.cell, styles.headerCell]}>S.No</Text>
          <Text style={[styles.cell, styles.headerCell]}>Course Title</Text>
          <Text style={[styles.cell, styles.headerCell]}>Course Title</Text>
          <Text style={[styles.cell, styles.headerCell]}>Exam Date</Text>
          <Text style={[styles.cell, styles.headerCell]}>Session</Text>
          <Text style={[styles.cell, styles.headerCell]}>Hall</Text>
        </View>

        {/* Rows */}
        {filteredExamData.map((data, index) => {
          const roomList = studentData.roomno
            ? studentData.roomno.split(',').map((r: string) => r.trim())
            : [];
          const currentRoom = roomList[index] || 'Not Allocated';

          const examDate = new Date(data.date);
          const now = new Date();

          let releaseTime = new Date(examDate);
          if (data.session === 'FN') {
            releaseTime.setHours(8, 0, 0, 0);
          } else {
            releaseTime.setHours(12, 30, 0, 0);
          }

          let displayRoom =
            releaseTime < now
              ? currentRoom
              : 'Wait ' + getDateTimeDiff(now, releaseTime);

          return (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 && styles.tableRowAlt,
              ]}
            >
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{data.coursecode}</Text>
              <Text style={styles.cell}>{data.coursename}</Text>
              <Text style={styles.cell}>{data.date}</Text>
              <Text style={styles.cell}>{data.session}</Text>
              <Text style={styles.cell}>{displayRoom}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 14,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#999',
  },
  headerCell: {
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: '#f0f0f0',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa', // zebra stripe
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 10,
    borderRightWidth: 1, // vertical line
    borderColor: '#ccc',
  },
});
