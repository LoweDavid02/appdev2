import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import { useQuery, useMutation, useConvex } from "convex/react";
import { GenericId } from "convex/values";
import { api } from "../convex/_generated/api";

// ---------------------------------------------------------------------------
// Detect whether a ConvexProvider is present in the tree.
// useConvex() returns the client object when a provider exists, or undefined
// when it does not — it does NOT throw. We check the return value directly.
// ---------------------------------------------------------------------------
function useHasConvexProvider(): boolean {
  const client = useConvex();
  return client !== undefined && client !== null;
}

// ---------------------------------------------------------------------------
// Local todo type (mirrors the Convex schema shape)
// ---------------------------------------------------------------------------
type LocalTodo = {
  _id: string;
  text: string;
  isCompleted: boolean;
};

// Convex document shape for a todo
type TodoDoc = {
  _id: GenericId<"todos">;
  _creationTime: number;
  text: string;
  isCompleted: boolean;
};

// ---------------------------------------------------------------------------
// Shared UI props
// ---------------------------------------------------------------------------
type TodoUIProps = {
  task: string;
  setTask: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filterTodos: LocalTodo[];
  completedCount: number;
  totalCount: number;
  handleAddTodo: () => void;
  toggleTodo: (id: string) => void;
  confirmDelete: (id: string) => void;
};

// ---------------------------------------------------------------------------
// Shared UI — used by both local and Convex modes
// ---------------------------------------------------------------------------
const TodoUI = ({
  task,
  setTask,
  searchQuery,
  setSearchQuery,
  filterTodos,
  completedCount,
  totalCount,
  handleAddTodo,
  toggleTodo,
  confirmDelete,
}: TodoUIProps) => (
  <View style={styles.container}>
    {/* Header (Purple) */}
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
                  ? (`${Math.round((completedCount / totalCount) * 100)}%` as `${number}%`)
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

    {/* Body (White with Rounded Top) */}
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
                onPress={() => toggleTodo(item._id)}
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

      {/* Input Section */}
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
            style={[
              styles.addButton,
              task.trim().length === 0 && styles.addButtonDisabled,
            ]}
            onPress={handleAddTodo}
            activeOpacity={0.8}
          >
            <Ionicons
              name="add"
              size={32}
              color={task.trim().length === 0 ? "#AAA" : "#1A1A2E"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  </View>
);

// ---------------------------------------------------------------------------
// Local-state todo screen — fully functional without any backend
// ---------------------------------------------------------------------------
const LocalTodoScreen = () => {
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState<LocalTodo[]>([]);
  const [nextId, setNextId] = useState(1);

  const filterTodos = todos.filter((item) =>
    item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const handleAddTodo = () => {
    if (task.trim().length === 0) return;
    setTodos((prev) => [
      { _id: String(nextId), text: task.trim(), isCompleted: false },
      ...prev,
    ]);
    setNextId((n) => n + 1);
    setTask("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const confirmDelete = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to remove this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTodos((prev) => prev.filter((t) => t._id !== id)),
      },
    ]);
  };

  return (
    <TodoUI
      task={task}
      setTask={setTask}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filterTodos={filterTodos}
      completedCount={todos.filter((t) => t.isCompleted).length}
      totalCount={todos.length}
      handleAddTodo={handleAddTodo}
      toggleTodo={toggleTodo}
      confirmDelete={confirmDelete}
    />
  );
};

// ---------------------------------------------------------------------------
// Convex-backed todo screen — only rendered when ConvexProvider is present
// ---------------------------------------------------------------------------
const ConvexTodoScreen = () => {
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const todoList = useQuery(api.todos.get) as TodoDoc[] | undefined;
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

  const toggleTodo = (id: GenericId<"todos">, currentStatus: boolean) => {
    toggleTodoMutation({ id, isCompleted: !currentStatus });
  };

  const confirmDelete = (id: GenericId<"todos">) => {
    Alert.alert("Delete Task", "Are you sure you want to remove this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodoMutation({ id }),
      },
    ]);
  };

  const adaptedTodos: LocalTodo[] = filterTodos.map((item) => ({
    _id: item._id as string,
    text: item.text,
    isCompleted: item.isCompleted,
  }));

  return (
    <TodoUI
      task={task}
      setTask={setTask}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filterTodos={adaptedTodos}
      completedCount={todoList.filter((item) => item.isCompleted).length}
      totalCount={todoList.length}
      handleAddTodo={handleAddTodo}
      toggleTodo={(id) => {
        const original = todoList.find((t) => (t._id as string) === id);
        if (original) toggleTodo(original._id, original.isCompleted);
      }}
      confirmDelete={(id) => {
        const original = todoList.find((t) => (t._id as string) === id);
        if (original) confirmDelete(original._id);
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
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
    marginTop: 16,
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
    height: 6,
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

// ---------------------------------------------------------------------------
// Public export
// Renders ConvexTodoScreen when a real ConvexProvider is in the tree,
// otherwise falls back to the fully-functional local-state version.
// ---------------------------------------------------------------------------
const TodoScreen = () => {
  const hasProvider = useHasConvexProvider();
  return hasProvider ? <ConvexTodoScreen /> : <LocalTodoScreen />;
};

export default TodoScreen;
