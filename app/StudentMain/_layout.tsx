import { Stack } from "expo-router";

export default function StudentMainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="seat-allocation" options={{ title: "Seat Allocation" }} />
      <Stack.Screen name="exam/[code]" options={{ title: "Exam Details" }} />
    </Stack>
  );
}
