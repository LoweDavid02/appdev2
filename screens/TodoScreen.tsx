import { useState } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

const TodoScreen = () => {
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const todoList = useQuery(api.todos.get);
  const addTodo = useMutation(api.todos.add);
  const toggleTodoMutation = useMutation(api.todos.toggle);
  const deleteTodoMutation = useMutation(api.todos.remove);

  if (todoList === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  const filterTodos = todoList.filter((item) =>
    item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const handleAddTodo = async () => {
    if (task.trim().length === 0) return;
    await addTodo({ text: task });
    setTask("");
  };

  const toggleTodo = (id: Id<"todos">, currentStatus: boolean) => {
    toggleTodoMutation({ id, isCompleted: !currentStatus });
  };

  const confirmDelete = (id: Id<"todos">) => {
    Alert.alert("Delete Task", "Are you sure you want to remove this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodoMutation({ id }),
      },
    ]);
  };

  const completedCount = todoList.filter((item) => item.isCompleted).length;
  const totalCount = todoList.length;

  return (
    <View style={styles.container}>
      {/* 1. Header Section (Purple) */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good day! 👋</Text>
            <Text style={styles.title}>My Tasks</Text>
          </View>
          <View style={styles.statsCircle}>
            <Text style={styles.statsNumber}>{completedCount}</Text>
            <Text style={styles.statsLabel}>done</Text>
          </View>
        </View>

        <Text style={styles.progressLabel}>
          {completedCount} of {totalCount} tasks completed
        </Text>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width:
                  totalCount > 0
                    ? `${(completedCount / totalCount) * 100}%`
                    : "0%",
              },
            ]}
          />
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9B97FF" />
          <TextInput
            placeholder="Search todos..."
            placeholderTextColor="#AAA"
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#AAA" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 2. Body Section (White with Rounded Top) */}
      <View style={styles.bodyContainer}>
        {filterTodos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-done-circle-outline" size={64} color="#E0DFFF" />
            <Text style={styles.emptyTitle}>
              {searchQuery ? "No results found" : "All clear!"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? "Try a different search term"
                : "Add a task below to get started"}
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filterTodos.map((item) => (
              <View style={styles.todoItem} key={item._id}>
                <TouchableOpacity
                  style={styles.textWrapper}
                  onPress={() => toggleTodo(item._id, item.isCompleted)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkCircle,
                      item.isCompleted && styles.checkCircleCompleted,
                    ]}
                  >
                    {item.isCompleted && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.todoText,
                      item.isCompleted && styles.todoCompleted,
                    ]}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmDelete(item._id)}
                  style={styles.deleteBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
        )}

        {/* 3. Input Section */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Add a new task..."
              placeholderTextColor="#BBB"
              style={styles.input}
              value={task}
              onChangeText={setTask}
              onSubmitEditing={handleAddTodo}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.addButton, task.trim().length === 0 && styles.addButtonDisabled]}
              onPress={handleAddTodo}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={32} color={task.trim().length === 0 ? "#AAA" : "#1A1A2E"} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#7D7AFF",
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  statsCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
    lineHeight: 22,
  },
  statsLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.5,
  },
  progressLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFCC00",
    borderRadius: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: "#5553C7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBar: {
    flex: 1,
    height: 52,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "#F8F7FF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C0BFFF",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#C8C7D8",
    marginTop: 6,
    textAlign: "center",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: "#7D7AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0EFFF",
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D0CFFF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  checkCircleCompleted: {
    backgroundColor: "#7D7AFF",
    borderColor: "#7D7AFF",
  },
  todoText: {
    fontSize: 15,
    color: "#2D2D4E",
    marginLeft: 14,
    flex: 1,
    fontWeight: "500",
    lineHeight: 22,
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    color: "#B0AFCC",
    fontWeight: "400",
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 32,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#2D2D4E",
    borderWidth: 1.5,
    borderColor: "#E8E7FF",
    shadowColor: "#7D7AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  addButton: {
    backgroundColor: "#FFCC00",
    borderRadius: 18,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    shadowColor: "#FFCC00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: "#F0F0F0",
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default TodoScreen;
