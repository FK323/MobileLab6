import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import TaskList from "./components/TaskList"; // Assuming you'll place the TaskList.tsx in a components folder

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TaskList />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
});
