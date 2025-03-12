import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getTasks } from "../lib/supabase_crud";

// Define the Task interface based on your database structure
interface Task {
  id: number;
  tasks: string;
  created_at: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tasks when component mounts
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>
          No tasks found. Add some tasks to get started!
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.tasks}</Text>
              <Text style={styles.dateText}>
                Created: {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  taskItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default TaskList;
