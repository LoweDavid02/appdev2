import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const COLORS = {
  bg: '#0F0F14',
  surface: '#1A1A24',
  surfaceAlt: '#22222E',
  border: '#2E2E3E',
  accent: '#7C6AF7',
  accentSoft: '#9D94F8',
  accentGlow: 'rgba(124, 106, 247, 0.15)',
  success: '#4ECCA3',
  successGlow: 'rgba(78, 204, 163, 0.12)',
  danger: '#FF6B6B',
  dangerGlow: 'rgba(255, 107, 107, 0.12)',
  textPrimary: '#F0EFF8',
  textSecondary: '#8A8AA3',
  textMuted: '#4A4A62',
  white: '#FFFFFF',
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const TodoItem = ({ item, onToggle, onDelete }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(opacityAnim, {
      toValue: 1,
      tension: 80,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggle = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => onToggle(item.id));
  };

  const handleDelete = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onDelete(item.id));
  };

  return (
    <Animated.View
      style={[
        styles.todoItem,
        item.completed && styles.todoItemCompleted,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    >
      <TouchableOpacity
        onPress={handleToggle}
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        activeOpacity={0.7}
      >
        {item.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      <View style={styles.todoTextContainer}>
        <Text
          style={[
            styles.todoText,
            item.completed && styles.todoTextCompleted,
          ]}
          numberOfLines={2}
        >
          {item.text}
        </Text>
        <Text style={styles.todoMeta}>
          {item.completed ? '✦ Completed' : '◈ In progress'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        style={styles.deleteBtn}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function TodoScreen() {
  const [todos, setTodos] = useState([
    { id: generateId(), text: 'Design the app UI', completed: true },
    { id: generateId(), text: 'Implement core features', completed: false },
    { id: generateId(), text: 'Write unit tests', completed: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length > 0 ? completedCount / todos.length : 0;

  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false },
      ...prev,
    ]);
    setInputText('');
  };

  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const progressWidth = `${Math.round(progress * 100)}%`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerEyebrow}>MY WORKSPACE</Text>
              <Text style={styles.headerTitle}>Focus List</Text>
            </View>
            <View style={styles.statsChip}>
              <Text style={styles.statsChipText}>
                {completedCount}/{todos.length}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
            <Text style={styles.progressLabel}>
              {Math.round(progress * 100)}% complete
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              placeholderTextColor={COLORS.textMuted}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearSearch}>
                <Text style={styles.clearSearchText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Todo List */}
          <FlatList
            data={filteredTodos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>◎</Text>
                <Text style={styles.emptyTitle}>
                  {searchText ? 'No results found' : 'Clear slate'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {searchText
                    ? `No tasks match "${searchText}"`
                    : 'Add a task below to get started'}
                </Text>
              </View>
            }
          />

          {/* Add Input */}
          <View style={styles.addContainer}>
            <TextInput
              ref={inputRef}
              style={styles.addInput}
              placeholder="Add a new task..."
              placeholderTextColor={COLORS.textMuted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[styles.addBtn, !inputText.trim() && styles.addBtnDisabled]}
              onPress={handleAdd}
              activeOpacity={0.8}
              disabled={!inputText.trim()}
            >
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  headerEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.accent,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  statsChip: {
    backgroundColor: COLORS.accentGlow,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statsChipText: {
    color: COLORS.accentSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Progress
  progressContainer: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    color: COLORS.textMuted,
    marginRight: 10,
    marginTop: -2,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  clearSearch: {
    padding: 4,
  },
  clearSearchText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },

  // List
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },

  // Todo Item
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  todoItemCompleted: {
    backgroundColor: COLORS.successGlow,
    borderColor: 'rgba(78, 204, 163, 0.2)',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceAlt,
  },
  checkboxCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.bg,
    fontSize: 13,
    fontWeight: '900',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  todoMeta: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.dangerGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: '700',
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Add Input
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 6,
    marginBottom: 16,
    height: 58,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  addInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
  },
});
